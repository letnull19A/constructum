import { client, connect, disconnect } from '../database/database.redis.js'
import { $log as logger } from '@tsed/logger'

logger.name = 'SERVICE_SESSION'

export const startSession = async (key: string | undefined, payload: string) => {
	if (key === undefined) {
		throw new Error('Ключ не определён')
	}

	await connect()
	await client.set(key, payload)
	await disconnect()
}

export const endSesison = async (key: string) => {
	await connect()
	await client.del(key)
	await disconnect()
}

export const sessionIsAvalible = async (key: string): Promise<boolean> => {
	try {
		await connect()

		const jwtToken = await client.get(key)

		await disconnect()

		return jwtToken !== null && jwtToken !== undefined && jwtToken !== ''
	} catch (e) {
		logger.error(e)
	}

	return false
}
