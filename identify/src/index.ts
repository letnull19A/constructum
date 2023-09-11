import dotenv from 'dotenv'
import process from 'process'
import express from 'express'
import { $log as logger } from '@tsed/logger'
import { trpcRouter } from './routes/trpc'

if (process.env.NODE_ENV === 'pruduction') {   
    dotenv.config({ path: `` })
} else if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: `` })
}

if (process.env.PORT === 0 || !Number.isNaN(process.env.PORT)) {
    throw Error('env parameter PORT is 0 or isNaN value')
}

const port = process.env.PORT

const app = express()

logger.info('starting server')

app.use('api/identity', trpcRouter, () => {
    logger.info('tRPC router is active!')
})

app.listen(port, () => {
    logger.info(`server started on: ${port}`)
})