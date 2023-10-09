import { Schema } from "mongoose";
export interface IUser {
    name: String;
    surname: String;
    email: String;
    password: String;
    login: String;
    projects: Array<Schema.Types.ObjectId>;
}
