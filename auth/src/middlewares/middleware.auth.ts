import { NextFunction, Request, Response } from 'express'
import { isValid } from '../services/service.auth-validation.js'
import { $log as logger } from '@tsed/logger'
import { connect, disconnect } from '../database/database.redis.js'
import { sessionIsAvalible } from '../services/service.session.js'
import { isVerifyAccessToken } from '../services/service.jwt.js'
import { IJwtAccessToken } from '../interfaces/IJwtAccessToken.js'

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization']
    const resultValidation = isValid(authorizationHeader)
    const bearerToken: IJwtAccessToken = {
      access: authorizationHeader?.split(' ')[1] ?? '',
    }

    if (resultValidation) {
      await connect()

      if ((await sessionIsAvalible(bearerToken.access)) && isVerifyAccessToken(bearerToken)) {
        await disconnect()
        next()
      } else {
        res.status(401).send('Пользователь не авторизован')
      }
    }
  } catch (err) {
    logger.error(err)
  }
}
