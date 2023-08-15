import { client, connect, disconnect, RedisService } from '../database/database.redis.js'
import { $log as logger } from '@tsed/logger'

logger.name = 'SERVICE_SESSION'

export const startSession = async (key: string | undefined, payload: string) => {
	if (key === undefined) {
		throw new Error('Ключ не определён')
	}

	const redis = new RedisService()

	await redis.connect()
	await redis.readyClient.set(key, payload)
	await redis.disconnect()

	// await connect()
	// await client.set(key, payload)
	// await disconnect()
}

export const endSessison = async (key: string) => {

	const redis = new RedisService()

	await redis.connect()
	await redis.readyClient.del(key)
	await redis.disconnect()
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
