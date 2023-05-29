import { NextFunction, Request, Response } from 'express'
import { isValid } from '../services/service.auth-validation.js'
import { connect, disconnect } from '../database/database.redis.js'
import { sessionIsAvalible } from '../services/service.session.js'

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization']
    const resultValidation = isValid(authorizationHeader)
    const userId = authorizationHeader?.split(' ')[1] ?? ''

    if (resultValidation) {
      await connect()

      if (await sessionIsAvalible(userId)) {
        disconnect()
        next()
      } else {
        throw Error()
      }
    }
  } catch (err) {
    res.status(401).send('Пользователь не авторизован')
  }
}
