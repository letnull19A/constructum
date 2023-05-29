import express from 'express'
import dotenv from 'dotenv'
import { $log as logger } from '@tsed/logger'
import publicRouter from './routes/index.js'
import bodyParser from 'body-parser'

logger.level = 'debug'
logger.name = 'API'

dotenv.config()

const port = process.env.PORT | 3001

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', publicRouter)

app.listen(port, () => {
  logger.debug(`server starten on port: ${port}`)
})
