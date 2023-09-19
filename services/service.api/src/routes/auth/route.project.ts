import express from 'express'
import { connect, disconnect } from '../../database/database.mongo.js'
import Project from '../../schemas/scheme.project.js'
import { Types } from 'mongoose'
import { $log as logger } from '@tsed/logger'

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

projectRoute.put('/:id', (req, res) => {
  res.send('project successfuly updated')
})

projectRoute.delete('/:id', (req, res) => {
  res.send('project successfuly deleted')
})
