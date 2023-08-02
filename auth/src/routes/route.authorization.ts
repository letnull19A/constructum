import express from 'express'
import User, { IUser } from './../schemas/scheme.user.js'
import { connect as mongoConnect, disconnect as mongoDisconnect } from './../database/database.mongo.js'
import { connect as redisConnect, disconnect as redisDisconnect } from './../database/database.redis.js'
import { generateJwtSet } from './../services/index.js'
import { comparePassword } from './../services/service.salt.js'
import { startSession } from './../services/service.session.js'
import { isNotAuth } from './../middlewares/middleware.not-auth.js'
import { $log as logger } from '@tsed/logger'
import { IJwtPayload, IAuthResponse } from 'constructum-interfaces'

export const authRoute = express.Router()

authRoute.post('/auth', isNotAuth, async (req, res) => {
  const { login, password } = req.body

  if (login === undefined || login === '') {
    res.status(400).send('login is undefined or empty')
    return
  }

  if (password === undefined || password === '') {
    res.status(400).send('password is undefined or empty')
    return
  }

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
      await redisDisconnect()
      await mongoDisconnect()

      const response: IAuthResponse = {
        tokens: jwtTokens,
        user: payload,
      }

      res.status(200).send(response)
    })
    .catch((err) => {
      logger.error(err)
    })
})
