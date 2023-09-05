import { RedisClientType, createClient } from 'redis'

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

	async connect(onError?: (error: any) => void, onSuccess?: () => void): Promise<void> {
		try {
			await this._client.connect()
			onSuccess?.()
		} catch (error) {
			onError?.(error)
		}
	}

	async disconnect(onError?: (error: any) => void, onSuccess?: () => void): Promise<void> {
		try {
			await this._client.quit()
			onSuccess?.()
		} catch (error) {
			onError?.(error)
		}
	}
}
