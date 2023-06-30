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
  logger.info(`(disconnect) connections now: ${mongoose.connections.length}`)
  if (mongoose.connections.length > 0) {
    await mongoose.connection.close()
  }
}
