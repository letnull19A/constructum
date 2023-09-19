import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { appRouter } from 'constructum-compiler'
import { $log as logger } from '@tsed/logger'
import dotenv from 'dotenv'

logger.name = 'COMPILER'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

if (process.env.PORT === undefined) {
	throw Error('parameter PORT is undefined or empty')
}

if (process.env.HOST === undefined || process.env.HOST === '') {
	throw Error('parameter HOST is undefined or empty')
}

const main = async () => {

	logger.info('compiler starting...')

	dotenv.config({ path: `./.env.${process.env.NODE_ENV}` })

	const server = createHTTPServer({ 
		router: appRouter 
	})

	logger.info('successful initialization')
	logger.info(`compiler run in ${process.env.NODE_ENV} mode`)

	server.listen(process.env.PORT, process.env.HOST)

	logger.info(`compiler listen ${process.env.HOST}:${process.env.PORT}`)
}

main().catch(logger.error)