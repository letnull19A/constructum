import mongoose, { Mongoose } from 'mongoose'
import { $log as logger } from '@tsed/logger'
import { env } from 'process'

type MongoConnection = Promise<Mongoose | undefined>

logger.name = 'MONGO'

export const connect = async (): MongoConnection => {
	try {
		logger.info(`(connect) connections now: ${mongoose.connections.length}`)

		return await mongoose.connect(env.MONGO_CONNECTION as string)
	} catch (e) {
		logger.error(e)
	}
}

export const disconnect = async () => {
  try {
		logger.info(`(connect) connections now: ${mongoose.connections.length}`)

    await mongoose.connection.close()
	} catch (e) {
		logger.error(e)
	}
}
