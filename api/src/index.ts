import express from 'express'
import dotenv from 'dotenv'
import { $log as logger } from '@tsed/logger'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { env } from 'process'
import { connect as mongoConnect, disconnect as mongoDisconnect } from './database/database.mongo.js'
import { connect as redisConnect, disconnect as redisDisconnect } from './database/database.redis.js'

logger.level = 'debug'
logger.name = 'API'

dotenv.config({ path: `./.env.${env.NODE_ENV}` })

const port = process.env.PORT | 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)

app.listen(port, () => {
  console.clear()

  mongoConnect()
    .then(() => {
      logger.info('mongodb connected')
    })
    .catch((err) => {
      logger.error(err)
    })
    .finally(() => mongoDisconnect())

  redisConnect()
    .then(() => {
      logger.info('redis connected')
    })
    .catch((err) => {
      logger.error(err)
    })
    .finally(() => redisDisconnect())

  logger.info(`server started on port: ${port}`)
  logger.info(`server started with mode: ${env.NODE_ENV}`)
  logger.info(`mongo started on port: ${env.MONGO_CONNECTION}`)
  logger.info(`redis started on port: ${env.REDIS_CONNECTION}`)
  logger.info(`redis data: ${env.REDIS_HOST}:${env.REDIS_PORT}`)
})
