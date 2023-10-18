import dotenv from 'dotenv'
import process from 'process'
import { $log } from '@tsed/$log'
import { MongoDBWrapper } from 'constructum-dbs'
import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { appRouter } from 'constructum-identify'

$log.level = 'debug'
$log.name = 'IDENTIFY'

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

	$log.info('starting server')
	$log.info(`server started in ${process.env.NODE_ENV} mode`)

	await mongo.connect({
		onSuccess: () => {
			$log.info('mongodb connected')
		},
		onError: (error: any) => {
			$log.error(error)
		}
	})

	mongo.disconnect({
		onSuccess: () => $log.info('mongo disconnected'),
		onError: (error: any) => $log.error(error)
	})

	const server = createHTTPServer({
		router: appRouter
	})

	$log.info(`tRPC server listen now port: ${port}`)

	server.listen(port)
}

main().catch($log.error)
