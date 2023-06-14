import { Types } from 'mongoose'

export interface IJwtPayload {
  id: Types.ObjectId
  name: string | String
  email: string | String
  surname: string | String
  nickname: string | String
}
