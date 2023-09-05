import { Mongoose } from 'mongoose';
export type MongoConnection = Promise<Mongoose | undefined>;
export type DBsResponse = {
    onSuccess: () => void;
    onError: () => void;
};
/**
 * @description Обёртка для mongoose
*/
export declare class MongoDBWrapper {
    private readonly _connectionString;
    constructor(connectionString: string);
    connect(resp: DBsResponse): Promise<MongoConnection>;
    disconnect(resp: DBsResponse): Promise<void>;
}
