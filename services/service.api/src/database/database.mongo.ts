import mongoose, { Mongoose } from 'mongoose'
import { $log as logger } from '@tsed/logger'

type MongoConnection = Promise<Mongoose | undefined>

logger.name = 'MONGO'

export const connect = async (): MongoConnection => {
	try {
		logger.info(`connections now: ${mongoose.connections.length}`)

		return await mongoose.connect(process.env.MONGO_CONNECTION)
	} catch (e) {
		logger.error(e)
	}
}

export const disconnect = async () => {
  try {
		logger.info(`connections now: ${mongoose.connections.length}`)

    await mongoose.connection.close()
	} catch (e) {
		logger.error(e)
	}
}
