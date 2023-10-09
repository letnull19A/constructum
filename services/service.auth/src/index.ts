import express from 'express'
import dotenv from 'dotenv'
import { $log, $log as logger } from '@tsed/logger'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { RedisDBWrapper } from 'constructum-dbs'
import { trpcClient } from 'constructum-identify'

logger.level = 'debug'
logger.name = 'AUTH'

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` })

if (
	process.env.VERIFICATION_ATTEMPTS_OF_PING_TRPC === undefined || 
	Number.isNaN(process.env.VERIFICATION_ATTEMPTS_OF_PING_TRPC) ||
	process.env.VERIFICATION_ATTEMPTS_OF_PING_TRPC < 0)
	throw new Error('VERIFICATION_ATTEMPTS_OF_PING_TRPC is not defined or not a number or min than 0')

if (process.env.PORT === undefined || Number.isNaN(process.env.PORT))
	throw new Error('PORT env variable is not defined or not a number')

if (process.env.REDIS_URL === undefined || process.env.REDIS_URL === '')
	throw Error('REDIS_URL parameter is not defined')

if (process.env.IDENTIFY_ADDRESS === undefined || process.env.IDENTIFY_ADDRESS === '')
	throw new Error('IDENTIFY_ADDRESS is not defined')

const port = process.env.PORT

const checkIdentifyServerAlive = async () => {

	const count = process.env.VERIFICATION_ATTEMPTS_OF_PING_TRPC

	if (count === 0) return

	for (let i = 0; i < count; i++) {
		logger.info(`trying to connect to identify server... [${i + 1}|${count}]`)
		const client = trpcClient(process.env.IDENTIFY_ADDRESS)

		const result = await client.ping.query("hi") 

		if (result === 'pong') {
			$log.info('identify server is live')
			return
		}
	}

	throw new Error('identify server is not alive or count of requests exceeded')
}

const main = async () => {
	const redis = new RedisDBWrapper(process.env.REDIS_URL)

	const app = express()

	if (process.env.CORS_ENABLED) {

		const corsOptions = {
			origin: '*',
			optionsSuccessStatus: 200
		}

		app.use(cors(corsOptions))
		logger.info('cors is enabled')
	}

	app.use(bodyParser.urlencoded({ extended: true }))
	app.use('/api', router)

	redis.connect({
		onSuccess: () => logger.info('redis connected'),
		onError: (error: any) => logger.error(error)
	})

	redis.disconnect({
		onSuccess: () => logger.info('redis disconnected'),
		onError: (error: any) => logger.error(error)
	})

	checkIdentifyServerAlive()

	app.listen(port, () => {
		logger.info(`auth-server started on port: ${port}`)
		logger.info(`auth-server started with mode: ${process.env.NODE_ENV}`)
		logger.info(`listen redis: ${process.env.REDIS_URL}`)
		logger.info(`listen mongo: ${process.env.MONGO_CONNECTION}`)
		logger.info(`identify server: ${process.env.IDENTIFY_ADDRESS}`)
	})
}

main().catch(logger.error)