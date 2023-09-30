import mongoose, { Mongoose, mongo } from 'mongoose'
import { DbResponse } from '../types'

export type MongoConnection = Promise<Mongoose | undefined>

/**
 * @description Обёртка для mongoose
 */
export class MongoDBWrapper {
	private readonly _connectionString: string

	constructor(connectionString: string) {
		this._connectionString = connectionString
	}

	public async connect(resp?: DbResponse): Promise<typeof mongoose> {

        if (this._connectionString === undefined) {
            throw Error('connectionString is undefined')
        }

		const c = await mongoose.connect(this._connectionString)

		c.connection.on('connected', () => {
			resp?.onSuccess?.()
		})

		c.connection.on('error', (e) => {
			resp?.onError?.(e)
		})

		return c
	}

	public async disconnect(resp?: DbResponse): Promise<void> {
		try {
			await mongoose.disconnect()

			mongoose.connection.on('disconected', () => {
				resp?.onSuccess?.()
			})
		} catch (e) {
			resp?.onError?.(e)
		}
	}
}
