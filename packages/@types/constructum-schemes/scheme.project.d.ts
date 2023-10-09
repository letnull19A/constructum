import { Schema } from 'mongoose';
import { IProject } from 'constructum-interfaces';
export declare enum Access {
    Public = "PUBLIC",
    Private = "PRIVATE"
}
export declare const projectSchema: Schema<IProject, import("mongoose").Model<IProject, any, any, any, import("mongoose").Document<unknown, any, IProject> & IProject & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IProject, import("mongoose").Document<unknown, {}, IProject> & IProject & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const Project: import("mongoose").Model<IProject, {}, {}, {}, import("mongoose").Document<unknown, {}, IProject> & IProject & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default Project;
