import express from 'express'
import jwt from 'jsonwebtoken'
import { Session } from './../services/service.session.js'
import { generateJwtSet, isVerifyRefreshToken } from './../services/service.jwt.js'
import path, { dirname } from 'path'
import fs from 'fs'
import { IJwtPayload } from 'constructum-interfaces'
import { $log as logger } from '@tsed/logger' 
import { RedisDBWrapper } from 'constructum-dbs'

export const refreshRoute = express.Router() 

const redis = new RedisDBWrapper(process.env.REDIS_URL)
const session = new Session(redis)

logger.name = 'REFRESH'

refreshRoute.post('', async (req, res) => { 
  try {
    const { refresh } = req.body

    if ((await session.isAvalible(refresh)) && isVerifyRefreshToken({ refresh })) {
      const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
      const privateKey = fs.readFileSync(pathToKey).toString()
      
      await redis.connect()

      const decoded = jwt.verify(refresh?.toString() ?? '', privateKey) as IJwtPayload

      const payload: IJwtPayload = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        surname: decoded.surname,
        nickname: decoded.nickname,
      }

      const jwtTokens = generateJwtSet(payload)

      await session.end(refresh)

      await session.start(jwtTokens.refresh.toString(), JSON.stringify(jwtTokens))

      await redis.disconnect()

      res.status(200).json(jwtTokens)
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    logger.error(error)
  }
})
