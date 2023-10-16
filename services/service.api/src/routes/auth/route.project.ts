import express from 'express'
import { connect, disconnect } from '../../database/database.mongo.js'
import Project from '../../schemas/scheme.project.js'
import { Types } from 'mongoose'
import { $log as logger } from '@tsed/logger'
import { MongoClient, ObjectId } from 'mongodb'

export const projectRoute = express.Router()

projectRoute.get('/:id', async (req, res) => {
  const { id } = req.params

  if (id === null || id === undefined || id === '') res.status(400).send('Не корректные данные проекта!')

  try {
		const client = new MongoClient(process.env.MONGO_CONNECTION)

		await client.connect()

		client.on('open', () => logger.debug('mongoDB client connected to DB'))

		const db = client.db('ctor')

		const projects = db.collection('projects')
    
		const project = await projects.findOne({ _id: new ObjectId(id) })

		client.close()

		res.status(200).send(project)
	} catch (error) {
		logger.error(error)
	}
})

projectRoute.put('/:id', (req, res) => {
  res.send('project successfuly updated')
})

projectRoute.delete('/:id', (req, res) => {
  res.send('project successfuly deleted')
})
