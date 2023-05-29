import bcrypt from 'bcrypt'
import fs from 'fs'
import path, { dirname } from 'path'

const pathToSalt = path.join(dirname('.'), './keys/key.salt.pub')
const salt = fs.readFileSync(pathToSalt).toString()

export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number.parseInt(salt))
}

export const comparePassword = async (password: string, hash: String | undefined): Promise<boolean | null> => {
  if (hash === undefined) throw new Error('password is undefined')

  return await bcrypt.compare(password, hash.toString())
}
