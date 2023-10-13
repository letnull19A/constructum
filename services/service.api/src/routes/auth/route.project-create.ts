import express from 'express'
import { connect, disconnect } from '../../database/database.mongo.js'
import { projectSchema } from '../../schemas/scheme.project.js'
import { Types } from 'mongoose'
import { userSchema } from '../../schemas/scheme.user.js'
import { $log as logger } from '@tsed/logger'

export const projectCreateRoute = express.Router()

projectCreateRoute.post('/create', async (req, res) => {
	const { owner, name, description } = req.body

	const connection = await connect()

	if (connection === undefined) throw new Error('lost connection')

	const ProjectModel = connection.models.Project || connection?.model('Project', projectSchema)
	const UserModel = connection.models.User || connection?.model('User', userSchema)

	const newProject = new ProjectModel({
		owner: new Types.ObjectId(owner),
		name: name,
		description: description,
		members: new Types.ObjectId(owner),
		access: 'PRIVATE'
	})

	newProject
		.validate()
		.then(async () => {
			UserModel.findOneAndUpdate({ _id: new Types.ObjectId(owner) }, { $push: { projects: newProject._id } })
				.then(async (result) => {
					await newProject.save()
					await disconnect()
					res.status(200).send('Проект успешно создан')
				})
				.catch((error) => {
					logger.error(error)
					res.status(404).send('Пользователь не найден')
				})
		})
		.catch((err: any) => {
			res.status(400).send(err)
		})
})
