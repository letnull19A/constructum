import mongoose, { Mongoose } from 'mongoose'

export type MongoConnection = Promise<Mongoose | undefined>
export type DBsResponse = {
    onSuccess: () => void, 
    onError: () => void
}

/**
 * @description Обёртка для mongoose
*/
export class MongoDBWrapper {

    private readonly _connectionString: string

    constructor(connectionString: string) {
        this._connectionString = connectionString
    }

    public async connect(resp: DBsResponse): Promise<MongoConnection> {
        try {
            resp.onSuccess?.()
            return await mongoose.connect(this._connectionString)
        } catch (e) {
            resp.onError?.()
            return undefined
        }
    }

    public async disconnect(resp: DBsResponse): Promise<void> {
        try {
            resp.onSuccess?.()
            await mongoose.disconnect()
        } catch (e) {
            resp.onError?.()
        }
    }

}
