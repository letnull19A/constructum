import { Schema, model } from 'mongoose'
import { IUser } from 'constructum-interfaces'

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, 'Поле имя пустое'] },
  surname: { type: String, required: [true, 'Поле фамилия пустое'] },
  email: { type: String, unique: true, required: [true, 'Поле email пустое'] },
  password: { type: String, required: [true, 'Поле пароля пустое'] },
  login: { type: String, required: [true, 'Поле логина пустое'] },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
})

const User = model<IUser>('User', userSchema)

export default User
