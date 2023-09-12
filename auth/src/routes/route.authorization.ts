import express from 'express'
import User, { IUser } from './../schemas/scheme.user.js'
import { generateJwtSet } from './../services/index.js'
import { comparePassword } from './../services/service.salt.js'
import { Session } from './../services/service.session.js'
import { isNotAuth } from './../middlewares/middleware.not-auth.js'
import { $log as logger } from '@tsed/logger'
import { IJwtPayload, IAuthResponse } from 'constructum-interfaces'
import { RedisDBWrapper, MongoDBWrapper } from 'constructum-dbs'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { trpcClient } from 'constructum-identify'

export const authRoute = express.Router()

const redis = new RedisDBWrapper(process.env.REDIS_URL)
const mongo = new MongoDBWrapper(process.env.MONGO_CONNECTION)
const session = new Session(redis)

authRoute.post('/auth', isNotAuth, async (req, res) => {
  const { login, password } = req.body

  logger.debug('new auth query')

  // validation layer
  if (login === undefined || login === '') {
    res.status(400).send('login is undefined or empty')
    return
  }

  if (password === undefined || password === '') {
    res.status(400).send('password is undefined or empty')
    return
  }

  // layer logics
  await mongo.connect()
  await redis.connect()

  const identifyClient = trpcClient('localhost', 3689)

  const ping = identifyClient.ping.query('test')

  // const isIdentified = await identifyClient.identify.query(login)

  //const ping = await identifyClient.pingPong.query('Hello')

  logger.debug(`echo ping: ${ping}`)

  /** 
   * @todo: move to identify-microservice
  */
  User.findOne({ login: login })
    .then(async (data) => {
      if (data?.password === null || data?.password === undefined) {
        res.status(404).send('passwords is not defined')
        return
      }

      const comparedPassword = await comparePassword(password.toString(), data?.password)

      if (!comparedPassword) {
        res.status(404).send('user not found')
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

      const jwtTokens = generateJwtSet(payload)

      await session.start(jwtTokens.refresh.toString(), JSON.stringify(jwtTokens))

      await redis.disconnect()
      await mongo.disconnect()

      const response: IAuthResponse = {
        tokens: jwtTokens,
        user: payload,
      }

      res.status(200).send(response)
    })
    .catch((err) => {
      res.status(500).send(err)
      logger.error(err)
    })
})
