import express from 'express'
import User, { IUser } from '../../schemas/scheme.user.js'
import { connect as mongoConnect, disconnect as mongoDisconnect } from '../../database/database.mongo.js'
import { connect as redisConnect, disconnect as redisDisconnect } from '../../database/database.redis.js'
import { generateJwtSet } from '../../services/index.js'
import { comparePassword } from '../../services/service.salt.js'
import { startSession } from '../../services/service.session.js'
import { $log as logger } from '@tsed/logger'
import { IJwtPayload, IAuthResponse } from 'constructum-interfaces'

export const authRoute = express.Router()

authRoute.post('', async (req, res) => {
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
        return
      }

      const { name, surname, email, login } = data as IUser

      const payload: IJwtPayload = {
        id: data._id.toString(),
        nickname: login as string,
        name: name as string,
        surname: surname as string,
        email: email as string,
      }

      const jwtTokens = await generateJwtSet(payload)

      await startSession(jwtTokens.refresh.toString(), JSON.stringify(jwtTokens))

      const response: IAuthResponse = {
        tokens: jwtTokens,
        user: payload,
      }

      res.status(200).send(response)
    })
    .catch((err) => {
      logger.error(err)
    })
    .finally(async () => {
      await redisDisconnect()
      await mongoDisconnect()
    })
})
