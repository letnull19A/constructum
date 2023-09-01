import { RedisClientType } from "redis";
export declare class RedisService {
    private readonly _client;
    get readyClient(): RedisClientType;
    constructor(connectionString: string);
    connect(onError?: (error: any) => void, onSuccess?: () => void): Promise<void>;
    disconnect(onError?: (error: any) => void, onSuccess?: () => void): Promise<void>;
}
