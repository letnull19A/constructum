import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { appRouter } from 'constructum-compiler'
import { $log as logger } from '@tsed/logger'
import dotenv from 'dotenv'
import { env } from 'process'

logger.name = 'COMPILER'

const main = async () => {

	logger.info('compiler is starting...')

	dotenv.config({ path: `./.env.${env.NODE_ENV}` })

	const server = createHTTPServer({ 
		router: appRouter
	})

	logger.info('successful initialization')

	logger.info(`compiler run in ${env.NODE_ENV} mode`)

	const port = server.listen(env.PORT, env.HOST)

	logger.info(`compiler listen ${env.HOST}:${env.PORT}`)
}

main().catch(logger.error)