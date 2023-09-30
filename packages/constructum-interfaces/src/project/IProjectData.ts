import { IMetaData } from '../other/IMetaData'
import { IMetaBase } from '../other/IMetaBase'
import { IEntity } from './IEntity'
import { Types } from 'mongoose'

export interface IProjectData extends IMetaBase {
  _id: Types.ObjectId
  _meta: IMetaData
  name: string
  description?: string
  entities: Array<IEntity>
}