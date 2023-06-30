import { Schema, Types } from 'mongoose'
import { IEntity } from '.'

export interface IProject {
  owner: Types.ObjectId
  name: string
  description: string
  members: Array<Types.ObjectId>
  entities?: Array<IEntity>
  access: string
}
