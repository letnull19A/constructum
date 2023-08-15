import { IMetaData } from './IMetaData';
import { IMetaBase } from './IMetaBase';
import { Types } from 'mongoose';
export interface IFieldData extends IMetaBase {
    _id: Types.ObjectId;
    _meta: IMetaData;
    field_name: string;
    field_type: string;
    field_min?: number;
    field_max?: number;
    field_length?: number;
    isNull: boolean;
    indexes: Array<string>;
    description: string;
}
