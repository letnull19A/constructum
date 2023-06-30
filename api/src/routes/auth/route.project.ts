import express from 'express'
import { connect, disconnect } from '../../database/database.mongo.js'
import Project from '../../schemas/scheme.project.js'
import { Types } from 'mongoose'
import User from '../../schemas/scheme.user.js'
import { $log as logger } from '@tsed/logger'
import { IEntity, IProject } from 'constructum-interfaces'

export const projectRoute = express.Router()

projectRoute.get('/:id', async (req, res) => {
  const { id } = req.params

  if (id === null || id === undefined || id === '') res.status(400).send('Не корректные данные проекта!')

  await connect()

  await Project.findOne({ _id: new Types.ObjectId(id) })
    .then((project) => {
      res.send(project)
    })
    .catch((error) => {
      logger.error(error)
      res.status(500).send('Неожиданная ошибка!')
    })

  await disconnect()
})

projectRoute.post('', async (req, res) => {
  const { owner, name, description } = req.body

  await connect()

  const newProject = new Project({
    owner: new Types.ObjectId(owner),
    name: name,
    description: description,
    members: new Types.ObjectId(owner),
    access: 'PRIVATE',
  })

  logger.debug(newProject)

  newProject
    .validate()
    .then(async () => {
      User.findOneAndUpdate({ _id: new Types.ObjectId(owner) }, { $push: { projects: newProject._id } })
        .then(async (result) => {
          await newProject.save()
          res.send('Проект успешно создан')
        })
        .catch((error) => {
          logger.error(error)
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
