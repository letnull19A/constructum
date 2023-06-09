import express from 'express'
import dotenv from 'dotenv'
import { $log as logger } from '@tsed/logger'
import publicRouter from './routes/index.js'
import bodyParser from 'body-parser'
import { env } from 'process'
import { connect as mongoConnect } from './database/database.mongo.js'
import { connect as redisConnect, disconnect } from './database/database.redis.js'

logger.level = 'debug'
logger.name = 'API'

dotenv.config({ path: `./.env.${env.NODE_ENV}` })

const port = process.env.PORT | 3001

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', publicRouter)

mongoConnect()
  .then(() => {
    logger.info('mongodb connected')
  })
  .catch((err) => {
    logger.error(err)
  })

redisConnect()
  .then(() => {
    logger.info('redis connected')
  })
  .catch((err) => {
    logger.error(err)
  })

app.listen(port, () => {
  console.clear()

  logger.info(`server started on port: ${port}`)
  logger.info(`server started with mode: ${env.NODE_ENV}`)
  logger.info(`mongo started on port: ${env.MONGO_CONNECTION}`)
  logger.info(`redis started on port: ${env.REDIS_CONNECTION}`)
  logger.info(`redis data: ${env.REDIS_HOST}:${env.REDIS_PORT}`)
})
