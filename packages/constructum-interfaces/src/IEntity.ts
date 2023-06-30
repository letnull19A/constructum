import { IMetaData } from './IMetaData'
import { IMetaBase } from './IMetaBase'
import { IFieldData } from './IFieldData'
import { Types } from 'mongoose'

export interface IEntity extends IMetaBase {
  _id: Types.ObjectId
  _meta: IMetaData
  name: string
  fields?: Array<IFieldData>
}
