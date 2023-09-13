import dotenv from 'dotenv'
import process from 'process'
import { $log as logger } from '@tsed/logger'
import { MongoDBWrapper } from 'constructum-dbs'
import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { appRouter } from 'constructum-identify'

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
        router: appRouter
    })

    server.listen(3689)
}

main().catch(logger.error)