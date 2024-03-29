import express from 'express'
import { connect as mongoConnect, disconnect as mongoDisconnect } from '../../database/database.mongo.js'
import Project from '../../schemas/scheme.project.js'
import { $log as logger } from '@tsed/logger'

export const userDataRoute = express.Router()

logger.name = 'USER_DATA'

userDataRoute.get('/:uid/projects', async (req, res) => {
  const { uid } = req.params

  try {
    await mongoConnect()

    const response = await Project.find({ members: [`${uid}`] })

    logger.debug(response)

    res.status(200).send(response)
  } catch (error) {
    logger.error(error)
    res.status(500).send('Что-то пошло не так')
  }
})
