import { $log as logger } from '@tsed/logger'
import { RedisDBWrapper } from 'constructum-dbs'

logger.name = 'SERVICE_SESSION'

export class Session {

	private readonly _redisClient: RedisDBWrapper

	public constructor(redisClient: RedisDBWrapper) {
		this._redisClient = redisClient
	}

	public start = async (key: string, payload: string) => {
		if (key === undefined) {
			throw new Error('Ключ не определён')
		}

		await this._redisClient.connect()
		await this._redisClient.readyClient.set(key, payload)
		await this._redisClient.disconnect()
	}

	public end = async (key: string) => {


		await this._redisClient.connect()
		await this._redisClient.readyClient.del(key)
		await this._redisClient.disconnect()
	}

	public isAvalible = async (key: string): Promise<boolean> => {
		try {
			await this._redisClient.connect()

			const jwtToken = await this._redisClient.readyClient.get(key)

			await this._redisClient.disconnect()

			return jwtToken !== null && jwtToken !== undefined && jwtToken !== ''
		} catch (e) {
			logger.error(e)
		}

		return false
	}
}
