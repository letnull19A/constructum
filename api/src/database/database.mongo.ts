import mongoose, { Mongoose } from 'mongoose'
import { $log as logger } from '@tsed/logger'
import { env } from 'process'

type MongoConnection = Promise<Mongoose | undefined>

export const connect = async (): MongoConnection => {
  try {
    return await mongoose.connect(env.MONGO_CONNECTION as string)
  } catch (e) {
    logger.error(e)
  }
}

export const disconnect = async () => {
  await mongoose.connection.close()
}
