import express from 'express'
import User, { IUser } from '../../schemas/scheme.user.js'
import { connect as mongoConnect } from '../../database/database.mongo.js'
import { connect as redisConnect, disconnect } from '../../database/database.redis.js'
import { encryptPassword, generateJwtSet } from '../../services/index.js'
import { comparePassword } from '../../services/service.salt.js'

export const authRoute = express.Router()

authRoute.post('/auth', async (req, res) => {
  const { login, password } = req.body

  await mongoConnect()
  await redisConnect()

  User.findOne({ login: login })
    .then(async (data) => {
      const comparedPassword = await comparePassword(password.toString(), data?.password)

      if (!comparedPassword) {
        res.status(404).send('Пользователь не найден')
      }

      const { name, surname, email } = data as IUser

      const payload = {
        user: {
          name: name,
          surname: surname,
          email: email,
        },
      }

      res.status(200).send(generateJwtSet(payload))

      disconnect()
    })
    .catch((err) => {
      res.send(err)
    })
})
