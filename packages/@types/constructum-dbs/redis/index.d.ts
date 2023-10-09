import { RedisClientType } from 'redis';
import { DbResponse } from '../types';
/**
 * @description обёртка для редиса
*/
export declare class RedisDBWrapper {
    private readonly _client;
    get readyClient(): RedisClientType;
    constructor(connectionString: string);
    connect(response?: DbResponse): Promise<void>;
    disconnect(response?: DbResponse): Promise<void>;
}
