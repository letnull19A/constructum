import express from 'express'
import { $log } from '@tsed/logger'
import { MongoClient, ObjectId } from 'mongodb'
import { trpcClient } from 'constructum-compiler'

export const compilerRoute = express.Router()

compilerRoute.post('/:id/:syntax/build', async (req, res) => {
	const { id, syntax } = req.params

	if (id === undefined && syntax === undefined) {
		return res.status(400).send('bad input data!')
	}

	try {
		const client = new MongoClient(process.env.MONGO_CONNECTION)

		await client.connect()

		client.on('open', () => $log.debug('mongoDB client connected to DB'))

		const db = client.db('test')

		const projects = db.collection('projects')

		const project = await projects.findOne({ _id: new ObjectId(id) })

		const response = await trpcClient('localhost', 5490).build.query({
			syntaxName: syntax,
			projectData: JSON.stringify(project)
		})

		client.close()
		res.status(200).send(response)
	} catch (error) {
		$log.error(error)
	}
})

compilerRoute.get('/:id/build/:syntax', (req, res) => {
	res.status(200).send('{ }')
})
