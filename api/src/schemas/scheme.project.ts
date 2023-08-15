import { Schema, model } from 'mongoose'
import { IEntity, IProject } from 'constructum-interfaces'

export enum Access {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

const projectSchema = new Schema<IProject>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: [true, 'Название проекта не введено'] },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  entities: [{ type: Object }],
  access: { type: String, default: Access.Private },
})

const Project = model<IProject>('Project', projectSchema)

export default Project
