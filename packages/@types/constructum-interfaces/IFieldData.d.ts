import { IMetaData } from './IMetaData';
import { IMetaBase } from './IMetaBase';
import { Types } from 'mongoose';
export interface IFieldData extends IMetaBase {
    _id: Types.ObjectId;
    _meta: IMetaData;
    field_name: string;
    field_type: string;
    isNull: boolean;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
    description: string;
}
