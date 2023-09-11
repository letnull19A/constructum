import { RedisClientType, createClient } from 'redis'
import { DbResponse } from '../types'

/**
 * @description обёртка для редиса
*/
export class RedisDBWrapper {
	private readonly _client: RedisClientType

	public get readyClient(): RedisClientType {
		return this._client
	}

	constructor(connectionString: string) {
		this._client = createClient({ url: connectionString })
	}

	async connect(response?: DbResponse): Promise<void> {
		try {
			await this._client.connect()
			response?.onSuccess?.()
		} catch (error) {
			response?.onError?.(error)
		}
	}

	async disconnect(response?: DbResponse): Promise<void> {
		try {
			await this._client.quit()
			response?.onSuccess?.()
		} catch (error) {
			response?.onError?.(error)
		}
	}
}
