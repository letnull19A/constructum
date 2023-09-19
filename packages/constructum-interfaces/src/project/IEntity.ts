import { IMetaData } from '../other/IMetaData'
import { IMetaBase } from '../other/IMetaBase'
import { IFieldData } from './IFieldData'
import { Types } from 'mongoose'

export interface IEntity extends IMetaBase {
  _id: Types.ObjectId
  _meta: IMetaData
  name: string
  fields?: Array<IFieldData>
}