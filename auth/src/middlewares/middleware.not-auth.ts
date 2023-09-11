import { NextFunction, Request, Response } from 'express'
import { Session } from '../services/service.session.js'
import { RedisDBWrapper } from 'constructum-dbs'
import { isValid } from '../services/service.auth-validation.js'
import { $log as logger } from '@tsed/logger'

export const isNotAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const redis = new RedisDBWrapper(process.env.REDIS_URL)
		const session = new Session(redis)

		logger.debug('middleware: isNotAuth processing')

		const authorizationHeader = req.headers['authorization']

		if (authorizationHeader !== '' && authorizationHeader !== undefined) {
			logger.debug('middleware: authorization header is not empty and undefined')
		}

		const resultValidation = isValid(authorizationHeader)

		logger.debug(`middleware: validation is ${resultValidation ? 'success' : 'failed'}`)

		if (!resultValidation) {
			next()
		}

		const userId = authorizationHeader?.split(' ')[1] ?? ''

		await redis.connect()

		if (!(await session.isAvalible(userId))) {
			await redis.disconnect()
			next()
		} else {
			await redis.disconnect()
			res.status(401).send('Пользователь уже авторизован')
		}
	} catch (err) {
		logger.error(err)
		res.status(500).send(err)
	}
}
