import mongoose, { Mongoose } from 'mongoose'
import { $log as logger } from '@tsed/logger'

type MongoConnection = Promise<Mongoose | undefined>

export const connect = async (): MongoConnection => {
  try {
    return await mongoose.connect(process.env.MONGO_CONNECTION as string)
  } catch (e) {
    logger.error(e)
  }
}
