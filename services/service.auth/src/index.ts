import express from 'express'
import dotenv from 'dotenv'
import { $log as logger } from '@tsed/logger'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { RedisDBWrapper } from 'constructum-dbs'

logger.level = 'debug'
logger.name = 'AUTH'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
	dotenv.config({ path: `./.env.${process.env.NODE_ENV}` })
} else {
	dotenv.config({ path: './.env' })
}

const port = process.env.PORT | 8989

if (process.env.REDIS_URL === undefined || process.env.REDIS_URL === '') {
	throw Error('REDIS_URL parameter is not defined')
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

	redis.readyClient.set('key', 'value')

	logger.debug(await redis.readyClient.get('key'))

	redis.disconnect({
		onSuccess: () => logger.info('redis disconnected'),
		onError: (error: any) => logger.error(error)
	})

	app.listen(port, () => {
		logger.info(`auth-server started on port: ${port}`)
		logger.info(`auth-server started with mode: ${process.env.NODE_ENV}`)
		logger.info(`listen redis: ${process.env.REDIS_URL}`)
		logger.info(`listen mongo: ${process.env.MONGO_CONNECTION}`)
		logger.info(`identify server: ${process.env.IDENTIFY_SERVER}`)
	})
}

main().catch(logger.error)