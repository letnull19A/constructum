import { NextFunction, Request, Response } from 'express'
import { sessionIsAvalible } from '../services/service.session.js'
import { connect, disconnect } from '../database/database.redis.js'
import { isValid } from '../services/service.auth-validation.js'

export const isNotAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization']
    const resultValidation = isValid(authorizationHeader)

    if (!resultValidation) {
      next()
      return
    }

    const userId = authorizationHeader?.split(' ')[1] ?? ''

    await connect()

    if (!(await sessionIsAvalible(userId))) {
      await disconnect()
      next()
    } else {
      res.status(401).send('Пользователь уже авторизован')
    }
  } catch (err) {
    console.error(err)
  }
}
