import express from 'express'
import { $log as logger } from '@tsed/logger'
import Project from '../../schemas/scheme.project.js'
import { Types } from 'mongoose'
import { connect, disconnect } from '../../database/database.mongo.js'
import { IEntity, IFieldData, IProject } from 'constructum-interfaces'

export const fieldRoute = express.Router()

fieldRoute.get('/:id/entities/:entity_id/fields', async (req, res) => {
	const { id, entity_id } = req.params

	await connect()

	await Project.findOne(
		{ _id: new Types.ObjectId(id) },
		{ entities: { $elemMatch: { _id: new Types.ObjectId(entity_id) } }, _id: 0 }
	)
		.then(async (result) => {
			logger.debug(`project id: ${id}`)

			const entitiesResult = result?.entities

			if (entitiesResult === undefined) {
				res.status(400).send()
				await disconnect()
				return
			}

			res.status(200).send(entitiesResult[0].fields)
		})
		.catch((error) => {
			logger.error(error)
			res.status(400).send('Проект не найден!')
		})

	await disconnect()
})

interface IQuery {
	name: string
	type: string
	isNull: boolean
	indexes: Array<string>
	description: string
	min: number
	max: number
	length: number
}

fieldRoute.post('/:id/entities/:entity_id/fields', async (req, res) => {
	try {
		const { id, entity_id } = req.params
		const data: Array<IQuery> = req.body

		await connect()

		const target_project = await Project.findOne(
			{
				'_id': new Types.ObjectId(id),
				'entities._id': new Types.ObjectId(entity_id)
			}
		)

		logger.debug(target_project)

		if (target_project === undefined || target_project === undefined) {
			res.status(404).send('Project not found!')
			return
		}

		if (target_project?.entities === undefined) {
			res.status(400).send('Project has no entities!')
			return
		}

		const entityId = new Types.ObjectId(entity_id)

		const createField = (
			name: string,
			type: string,
			isNull: boolean,
			indexes: Array<string>,
			description: string,
			min: number,
			max: number,
			length: number
		): IFieldData => {
			return {
				_id: entityId,
				_meta: {
					_id: entityId,
					_version: {
						major: 0,
						minor: 0,
						revision: 0,
						build: 1
					},
					_created: Date.now()
				},
				field_name: name,
				field_type: type,
				field_min: min,
				field_max: max,
				field_length: length,
				isNull: isNull,
				indexes: indexes,
				description: description
			}
		}

		const index = target_project.entities.findIndex((entity) => entity._id.toString() === entityId.toString())

		logger.debug(index)

		target_project.entities[index].fields = new Array<IFieldData>()

		for (let i = 0; i < data.length; i++) {
			target_project.entities[index].fields!.push(
				createField(
					data[i].name,
					data[i].type,
					data[i].isNull,
					data[i].indexes,
					data[i].description,
					data[i].min,
					data[i].max,
					data[i].length
				)
			)
		}

		await Project.updateOne(
			{
				'_id': new Types.ObjectId(id),
				'entities._id': new Types.ObjectId(entity_id)
			},
			target_project
		)

		await target_project.save()

		await disconnect()

		res.status(200).send(target_project.entities[index].fields)
	} catch (e) {
		logger.error(e)
		res.status(400).send('unknown error!')
	}
})
