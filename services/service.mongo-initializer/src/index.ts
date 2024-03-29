import { $log as logger } from '@tsed/logger'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

logger.level = 'debug'
logger.name = 'MONGO-INITIALIZER'

const main = async () => {

    logger.info('mongo initializer started')
    
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

    if (process.env.MONGO_CONNECTION === undefined || process.env.MONGO_CONNECTION === '')
        throw new Error('MONGO_CONNECTION parmeter is undefined or empty')

    if (process.env.DATA_BASE === undefined || process.env.DATA_BASE === '')
        throw new Error('DATA_BASE parameter is undefined or empty')

    const client = new MongoClient(process.env.MONGO_CONNECTION)

    const y = await client.db('ctor').collection('users').insertOne({ name: 'admin', surname: 'admin' })

    if (client === null || client === undefined)
        throw new Error('client not created')

    try {

        const db = await client.connect()

        logger.info('successfully connect to MongoDB')

    } catch(error) {
        logger.error(error)
    } finally {
        client.close()
        logger.info('service exit...')
        process.exit(0)
    }

}

main()