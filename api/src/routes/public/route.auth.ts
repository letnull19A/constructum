import express from 'express'
import User, { IUser } from '../../schemas/scheme.user.js'
import { connect as mongoConnect, disconnect as mongoDisconnect } from '../../database/database.mongo.js'
import { connect as redisConnect, disconnect as redisDisconnect } from '../../database/database.redis.js'
import { generateJwtSet } from '../../services/index.js'
import { comparePassword } from '../../services/service.salt.js'
import { startSession } from '../../services/service.session.js'
import { Types } from 'mongoose'
import { isNotAuth } from '../../middlewares/middleware.not-auth.js'
import { $log as logger } from '@tsed/logger'

export const authRoute = express.Router()

authRoute.post('/auth', isNotAuth, async (req, res) => {
  const { login, password } = req.body

  await mongoConnect()
  await redisConnect()

  User.findOne({ login: login })
    .then(async (data) => {
      if (data?.password === null || data?.password === undefined) {
        res.status(404).send('Пользователь не найден')
        return
      }

      const comparedPassword = await comparePassword(password.toString(), data?.password)

      if (!comparedPassword) {
        res.status(404).send('Пользователь не найден')
      }

      const { name, surname, email } = data as IUser

      const payload = {
        user: {
          name: name,
          surname: surname,
          email: email,
        },
      }

      const jwtToken = generateJwtSet(payload)

      await startSession(new Types.ObjectId(data?._id).toString(), JSON.stringify(jwtToken))
      await redisDisconnect()
      await mongoDisconnect()

      res.status(200).send(jwtToken)
    })
    .catch((err) => {
      logger.error(err)
    })
})
