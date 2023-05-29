import express from 'express'
import { isAuth } from '../../middlewares/middleware.auth.js'
import { cilent, connect, disconnect } from '../../database/database.redis.js'

export const logoutRoute = express.Router()

logoutRoute.post('/logout', isAuth, async (req, res) => {
  try {
    const authorizationHeader = req.headers['authorization']
    const userId = authorizationHeader?.split(' ')[1] ?? ''

    await connect()

    await cilent.del(userId).then(() => {
      disconnect()
      res.status(308).send()
    })
  } catch (err) {
    console.error(err)
    res.status(401).send('Произошла непредвиденная ошибка')
  }
})
