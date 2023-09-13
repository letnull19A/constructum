import { IProject } from 'constructum-interfaces';
export declare enum Access {
    Public = "PUBLIC",
    Private = "PRIVATE"
}
declare const Project: import("mongoose").Model<IProject, {}, {}, {}, import("mongoose").Document<unknown, {}, IProject> & IProject & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default Project;
