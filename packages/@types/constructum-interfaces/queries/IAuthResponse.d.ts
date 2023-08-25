import { IJwtPayload } from '../authentication/IJwtPayload.js';
import { IJwtSet } from '../authentication/IJwtSet.js';
/**
 * @description Интерфейс ответа с сервера с access и refresh токенами
 */
export interface IAuthResponse {
    tokens: IJwtSet;
    user: IJwtPayload;
}
