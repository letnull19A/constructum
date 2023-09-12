import dotenv from 'dotenv'
import process from 'process'
// import express from 'express'
import { $log as logger } from '@tsed/logger'
import { router } from './routes/trpc'
import { MongoDBWrapper } from 'constructum-dbs'
import { createHTTPServer } from '@trpc/server/adapters/standalone'

/**
 * @todo сделай отдельный модуль под идентификацию пльзователя
*/

export { AppRouter } from './routes/trpc'

logger.level = 'debug'
logger.name = 'IDENTIFY'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

if (process.env.PORT === 0 || Number.isNaN(process.env.PORT)) {
    throw Error('env parameter PORT is 0 or isNaN value')
}

if (process.env.MONGO_CONNECTION === '' || process.env.MONGO_CONNECTION === undefined) {
    throw Error('env parameter MONGO_CONNECTION is empty or undefined')
}

const main = async () => {

    const mongo = new MongoDBWrapper(process.env.MONGO_CONNECTION)
    const port = process.env.PORT
    // const app = express()
    
    logger.info('starting server')
    
    mongo.connect({
        onSuccess: () => {
            logger.info('mongodb connected')
        },
        onError: (error) => {
            logger.error(error)
        }
    })

    mongo.disconnect({
        onSuccess: () => logger.info('mongo disconnected'),
        onError: (error) => logger.error(error)
    })

    const server = createHTTPServer({
        router: router
    })

    server.listen(port)

    // app.use('api/identity', trpcRouter)
    // logger.info('tRPC router is active!')
    
    // app.listen(port, () => {
    //     logger.info(`server started on: ${port}`)
    //     logger.info(`server run in ${process.env.NODE_ENV} mode`)
    // })
}

main().catch(logger.error)