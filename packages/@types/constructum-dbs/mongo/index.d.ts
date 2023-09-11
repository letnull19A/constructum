import { Mongoose } from 'mongoose';
import { DbResponse } from '../types';
export type MongoConnection = Promise<Mongoose | undefined>;
/**
 * @description Обёртка для mongoose
*/
export declare class MongoDBWrapper {
    private readonly _connectionString;
    constructor(connectionString: string);
    connect(resp?: DbResponse): Promise<MongoConnection>;
    disconnect(resp?: DbResponse): Promise<void>;
}
