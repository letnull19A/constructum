import express from 'express'
import { $log as logger } from '@tsed/logger'
import Project from '../../schemas/scheme.project.js'
import { Types } from 'mongoose'
import { connect, disconnect } from '../../database/database.mongo.js'
import { IEntity, IProject } from 'constructum-interfaces'

export const entityRoute = express.Router()

/**
 * @todo move it!
*/
entityRoute.get('/:id/entities/:entity_id', async (req, res) => {
  const { id, entity_id } = req.params

  await connect() 

  await Project.find(
    { _id: new Types.ObjectId(id) },
    { entities: { $elemMatch: { _id: new Types.ObjectId(entity_id) } } },
  )
    .then((result) => {
      logger.debug(`project id: ${id}`)

      res.status(200).send(result)
    })
    .catch((error) => {
      logger.error(error)
      res.status(400).send('Проект не найден!')
    })

  await disconnect()
})

entityRoute.get('/:id/entities', async (req, res) => {
  const { id } = req.params

  await connect()

  await Project.find({ _id: new Types.ObjectId(id) })
    .then((result) => {
      logger.debug(`project id: ${id}`)

      res.status(200).send(result)
    })
    .catch((error) => {
      logger.error(error)
      res.status(400).send('Проект не найден!')
    })

  await disconnect()
})

entityRoute.post('/:id/entities', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  await connect()

  const project = await Project.findById(new Types.ObjectId(id))

  if (project === null) {
    res.status(404).send('Project not found')
    return
  }

  const entityId = new Types.ObjectId()

  if (project.entities === undefined || project.entities === null) {
    project.entities = new Array<IEntity>() 
  }

  const entity: IEntity = {
    _id: entityId,
    _meta: {
      _id: entityId,
      _version: {
        major: 0,
        minor: 0,
        revision: 0,
        build: 1,
      },
      _created: Date.now(),
    },
    name: name,
    fields: [],
  }

  project.entities.push({ ...entity })

  logger.debug(project)

  await project.save()

  await disconnect()

  logger.debug(`project id: ${id}`)
})

entityRoute.delete('/:id/entities', (req, res) => {
  const { id } = req.params

  logger.debug(`project id: ${id}`)
})

entityRoute.put('/:id/entities', (req, res) => {
  const { id } = req.params

  logger.debug(`project id: ${id}`)
})
