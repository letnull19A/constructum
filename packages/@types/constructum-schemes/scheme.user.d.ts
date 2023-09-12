import { IUser } from 'constructum-interfaces';
declare const User: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser> & IUser & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default User;
