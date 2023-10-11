import express from 'express'
import User, { userSchema } from '../../schemas/scheme.user.js'
import { connect } from '../../database/database.mongo.js'
import { encryptPassword } from '../../services/index.js'
import { $log } from '@tsed/logger'
import mongoose from 'mongoose'

export const registrationRoute = express.Router()

registrationRoute.post('', async (req, res) => {

  $log.info('accepted new query: registration')

  const { name, surname, login, password, repassword, email } = req.body

  if (password !== repassword) {
    res.status(400).send('Пароли не совпадают')
  }

  const connection = await mongoose.connect(process.env.MONGO_CONNECTION)

  const encryptedPassword = await encryptPassword(password)

  if (connection === undefined)
    throw new Error('lost connection to DataBase Mongo')

  const UserModel = connection.models.User || connection.model('User', userSchema)

  const user = new UserModel({
    name: name,
    surname: surname,
    email: email,
    password: encryptedPassword,
    login: login,
  })

  await user
    .validate()
    .then(async () => {
      await user.save()
      return res.sendStatus(200)
    })
    .catch((err: any) => {
      return res.status(400).send(err)
    })
})
