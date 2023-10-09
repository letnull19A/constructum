import express from 'express'
import dotenv from 'dotenv'
import { $log as logger } from '@tsed/logger'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { MongoDBWrapper, RedisDBWrapper } from 'constructum-dbs'
import { trpcClient } from 'constructum-compiler'

logger.level = 'debug'
logger.name = 'API'

const checkCompilerServerAlive = async () => {

	const count = process.env.VERIFICATION_ATTEMPTS_OF_PING_TRPC

	if (count === 0) return

	for (let i = 0; i < count; i++) {
		logger.info(`trying to connect to identify server... [${i + 1}|${count}]`)
		const client = trpcClient(process.env.COMPILER_TRPC_ADDRESS)
		const result = await client.ping.query("fuck my brain!")

		if (result === 'pong') return
	}

	throw new Error('compiler server is not alive or count of requests exceeded')
}

const server = async () => {
	dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

	const port = process.env.PORT | 3001

	if (process.env.MONGO_CONNECTION === undefined || process.env.MONGO_CONNECTION === '')
		throw Error('parameter MONGO_CONNECTION cannot be undefined or empty')

	if (process.env.REDIS_URL === undefined || process.env.REDIS_URL === '')
		throw Error('parameter REDIS_URL cannot be undefined or empty')

	if (process.env.COMPILER_TRPC_ADDRESS === '' || process.env.COMPILER_TRPC_ADDRESS === undefined)
		throw Error('compiler tRPC COMPILER_TRPC_ADDRESS is empty or undefined')

	const mongo = new MongoDBWrapper(process.env.MONGO_CONNECTION)
	const redis = new RedisDBWrapper(process.env.REDIS_URL)

	const app = express()

	if (process.env.NODE_ENV === 'development' || process.env.ENABLED_CORS) {
		app.use(cors())
		logger.info('cors is enabled')
	}

	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())

	checkCompilerServerAlive()

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
}

server().catch(logger.error)
