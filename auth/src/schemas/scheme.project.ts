import { Schema, model } from 'mongoose'

export enum Acces {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export interface IProject {
  owner: Schema.Types.ObjectId
  name: String
  description: String
  members: Array<Schema.Types.ObjectId>
  access: String
}

const projectSchema = new Schema<IProject>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: [true, 'Название проекта не введено'] },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  access: { type: String, default: Acces.Private },
})

const Project = model<IProject>('Project', projectSchema)

export default Project
