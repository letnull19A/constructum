import express from 'express'
import dotenv from 'dotenv'
import { $log as logger } from '@tsed/logger'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { env } from 'process'
import { MongoDBWrapper, RedisDBWrapper } from 'constructum-dbs'

logger.level = 'debug'
logger.name = 'API'


dotenv.config({ path: `.env.${process.env.NODE_ENV}`})

const port = process.env.PORT | 3001

if (process.env.MONGO_CONNECTION === undefined || process.env.MONGO_CONNECTION === '') {
  throw Error('parameter MONGO_CONNECTION cannot be undefined or empty!')
}

const mongo = new MongoDBWrapper(process.env.MONGO_CONNECTION)

if (process.env.REDIS_URL === undefined || process.env.REDIS_URL === '') {
  throw Error('parameter REDIS_URL cannot be undefined or empty!')
}

const redis = new RedisDBWrapper(process.env.REDIS_URL)

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(cors())
  logger.info('cors is enabled')
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)

app.listen(port, () => {
  mongo.connect({
    onSuccess: () => logger.info('mongodb connected'),
    onError: (e: any) => logger.error(e)
  })
  
  redis.connect({
    onSuccess: () => logger.info('redis connected'),
    onError: (error: any) => logger.error(error)
  })
  
  logger.info(`server starting with mode: ${process.env.NODE_ENV}`)
  logger.info(`server started on port: ${port}`)
  logger.info(`mongo started on: ${process.env.MONGO_CONNECTION}`)
  logger.info(`redis started on: ${process.env.REDIS_URL}`)
})
