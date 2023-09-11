import mongoose, { Mongoose } from 'mongoose'
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

    public async connect(resp?: DbResponse): Promise<MongoConnection> {
        try {
            resp?.onSuccess?.()
            return await mongoose.connect(this._connectionString)
        } catch (e) {
            resp?.onError?.(e)
            return undefined
        }
    }

    public async disconnect(resp?: DbResponse): Promise<void> {
        try {
            resp?.onSuccess?.()
            await mongoose.disconnect()
        } catch (e) {
            resp?.onError?.(e)
        }
    }

}
