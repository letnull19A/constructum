import { RedisClientType } from 'redis';
/**
 * @description обёртка для редиса
*/
export declare class RedisDBWrapper {
    private readonly _client;
    get readyClient(): RedisClientType;
    constructor(connectionString: string);
    connect(onError?: (error: any) => void, onSuccess?: () => void): Promise<void>;
    disconnect(onError?: (error: any) => void, onSuccess?: () => void): Promise<void>;
}
