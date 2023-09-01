import { env } from 'process'
import { RedisClientType, createClient } from 'redis'
import { $log as logger } from '@tsed/logger'

logger.name = 'REDIS'

export class RedisService {
	private readonly _client: RedisClientType

	public get readyClient(): RedisClientType {
		return this._client
	}

	constructor() {
		this._client = createClient({ url: env.REDIS_URL })
	}

	async connect(onError?: (error: any) => void): Promise<void> {
		try {
      await this._client.connect()
			logger.info(`connection is open`)
		} catch (error) {
			onError?.(error)
			logger.error(error)
		}
	}

	async disconnect(onError?: (error: any) => void): Promise<void> {
		try {
      await this._client.quit()
			logger.info(`connection is closed`)
		} catch (error) {
			onError?.(error)
			logger.error(error)
		}
	}
}

/**
 * @deprecated
 */
export const client = createClient({ url: env.REDIS_URL })

/**
 * @deprecated
 */
export const connect = async () => {
	try {
		client.on('error', (err) => logger.error(err))

		if (!client.isOpen) {
			logger.info(`connected now`)
			await client.connect()
		}
	} catch (error) {
		logger.error(error)
	}
}

/**
 * @deprecated
 */
export const disconnect = async () => {
	try {
		client.on('error', (err) => logger.error(err))

		if (client.isOpen) {
			await client.quit()
		}
	} catch (error) {
		logger.error(error)
	}
}
