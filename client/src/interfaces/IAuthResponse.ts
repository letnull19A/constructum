import { IJwtPayload } from './IJwtPayload.js'
import { IJwtSet } from './IJwtSet.js'

export interface IAuthResponse {
  tokens: IJwtSet
  user: IJwtPayload
}
