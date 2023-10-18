import express from 'express'
import User, { userSchema } from '../../schemas/scheme.user.js'
import { connect } from '../../database/database.mongo.js'
import { encryptPassword } from '../../services/index.js'
import { $log } from '@tsed/logger'
import mongoose from 'mongoose'

export const registrationRoute = express.Router()

registrationRoute.post('', async (req, res) => {

  try {

    $log.info('accepted new query: registration')
    
    const { name, surname, login, password, repassword, email } = req.body

    if (name === '' || name === undefined) 
      return res.status(400).send('field name is empty or undefined')

    if (surname === '' || surname === undefined)
      return res.status(400).send('field surname is empty or undefined')

    if (login === '' || login === undefined)
      return res.status(400).send('field login is empty or undefined')

    if (password === '' || password === undefined)
      return res.status(400).send('field password is empty or undefined')
  
    if (repassword === '' || repassword === undefined)
      return res.status(400).send('field repassword is empty or undefined')

    if (password !== repassword)
      return res.status(400).send('field repassword not equal password')

    if (email === '' || email === undefined)
      return res.status(400).send('field email is empty or undefined')

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
        $log.error(err)
        return res.status(500).send('Ошибка сервера')
      })

  } catch (error: any) {
    $log.error(error)
    return res.status(500).send('Ошибка сервера')
  }
})
