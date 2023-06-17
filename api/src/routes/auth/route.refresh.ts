import express from 'express'
import jwt from 'jsonwebtoken'
import { connect, disconnect } from '../../database/database.redis.js'
import { endSesison, sessionIsAvalible, startSession } from '../../services/service.session.js'
import { generateJwtSet, isVerifyRefreshToken } from '../../services/service.jwt.js'
import path, { dirname } from 'path'
import fs from 'fs'
import { IJwtPayload } from 'constructum-interfaces'
import { $log as logger } from '@tsed/logger'

export const refreshRoute = express.Router()

logger.name = 'REFRESH'

refreshRoute.post('', async (req, res) => {
  try {
    const { refresh } = req.body

    if ((await sessionIsAvalible(refresh)) && isVerifyRefreshToken({ refresh })) {
      const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
      const privateKey = fs.readFileSync(pathToKey).toString()

      connect()

      const decoded = jwt.verify(refresh?.toString() ?? '', privateKey) as IJwtPayload

      const payload: IJwtPayload = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        surname: decoded.surname,
        nickname: decoded.nickname,
      }

      const jwtTokens = await generateJwtSet(payload)

      endSesison(refresh)

      await startSession(jwtTokens.refresh.toString(), JSON.stringify(jwtTokens))

      disconnect()

      res.status(200).json(jwtTokens)
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    logger.error(error)
  }
})
