import { IJwtPayload } from './IJwtPayload.js'
import { IJwtSet } from './IJwtSet.js'

/**
 * @description Интерфейс ответа с сервера с access и refresh токенами
 */
export interface IAuthResponse {
	tokens: IJwtSet
	user: IJwtPayload
}
