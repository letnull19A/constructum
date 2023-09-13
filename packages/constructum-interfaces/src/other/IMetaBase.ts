import { Types } from 'mongoose'
import { IMetaData } from './IMetaData'

export interface IMetaBase {
  _id: Types.ObjectId
  _meta: IMetaData
}