import express from 'express'
import { connect } from '../../database/database.mongo.js'
import Project from '../../schemas/scheme.project.js'
import { Types } from 'mongoose'
import User from '../../schemas/scheme.user.js'

export const projectRoute = express.Router()

projectRoute.get('', (req, res) => {
  const { id } = req.body

  console.log(id)

  res.send('some project')
})

projectRoute.get('/:id', (req, res) => {
  res.send(`current project is ${req.params.id}`)
})

projectRoute.post('', async (req, res) => {
  const { owner, name, description } = req.body

  await connect()

  const project = new Project({
    name: name,
    description: description,
    owner: new Types.ObjectId(owner),
    members: new Types.ObjectId(owner),
  })

  project
    .validate()
    .then(async () => {
      User.findOneAndUpdate({ _id: new Types.ObjectId(owner) }, { $push: { projects: project._id } })
        .then(async (result) => {
          await project.save()
          res.send('Проект успешно создан')
        })
        .catch((err) => {
          res.status(404).send('Пользователь не найден')
        })
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

projectRoute.put('/:id', (req, res) => {
  res.send('project successfuly updated')
})

projectRoute.delete('/:id', (req, res) => {
  res.send('project successfuly deleted')
})
