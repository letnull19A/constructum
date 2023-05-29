import express from 'express'
import User, { IUser } from '../../schemas/scheme.user.js'
import { connect as mongoConnect } from '../../database/database.mongo.js'
import { connect as redisConnect, disconnect, cilent } from '../../database/database.redis.js'
import { generateJwtSet } from '../../services/index.js'
import { comparePassword } from '../../services/service.salt.js'
import { startSession } from '../../services/service.session.js'
import { Types } from 'mongoose'
import { isNotAuth } from '../../middlewares/middleware.not-auth.js'

export const authRoute = express.Router()

authRoute.post('/auth', isNotAuth, async (req, res) => {
  const { login, password } = req.body

  await mongoConnect()
  await redisConnect()

  User.findOne({ login: login })
    .then(async (data) => {
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

      await startSession(new Types.ObjectId(data?._id).toString(), JSON.stringify(payload))
      await disconnect()

      res.status(200).send(generateJwtSet(payload))
    })
    .catch((err) => {
      console.error(err)
    })
})
