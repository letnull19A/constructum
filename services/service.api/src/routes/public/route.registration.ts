import express from 'express'
import User from '../../schemas/scheme.user.js'
import { connect } from '../../database/database.mongo.js'
import { encryptPassword } from '../../services/index.js'

export const registrationRoute = express.Router()

registrationRoute.post('', async (req, res) => {
  const { name, surname, login, password, repassword, email } = req.body

  if (password !== repassword) {
    res.status(400).send('Пароли не совпадают')
  }

  await connect()

  const encryptedPassword = await encryptPassword(password)

  const user = new User({
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
    .catch((err) => {
      return res.status(400).send(err)
    })
})
