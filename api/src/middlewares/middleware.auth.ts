import { NextFunction, Request, Response } from 'express'
import { isValid } from '../services/service.auth-validation.js'
import { $log as logger } from '@tsed/logger'
import { isVerifyAccessToken } from '../services/service.jwt.js'
import { IJwtAccessToken } from 'constructum-interfaces'

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization']
    const resultValidation = isValid(authorizationHeader)
    const bearerToken: IJwtAccessToken = {
      access: authorizationHeader?.split(' ')[1] ?? '',
    }

    if (resultValidation && isVerifyAccessToken(bearerToken)) {
      next()
    } else {
      res.status(401).send('Пользователь не авторизован')
    }
  } catch (err) {
    logger.error(err)
  }
}
