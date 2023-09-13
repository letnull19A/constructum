import { Types } from 'mongoose';
import { IVersion } from '../project/IVersion';
export interface IMetaData {
    _id: Types.ObjectId;
    _version: IVersion;
    _created: number;
}
