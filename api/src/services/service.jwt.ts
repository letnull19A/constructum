import jwt from 'jsonwebtoken'
import fs from 'fs'
import path, { dirname } from 'path'

export interface IJwtSet {
  access: string
  refresh: string
}

export type ReadyJwtSet = null | IJwtSet

export const generateJwtSet = (payload: any): ReadyJwtSet => {
  const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
  const privateKey = fs.readFileSync(pathToKey).toString()

  const accessToken = jwt.sign(payload, privateKey, {
    algorithm: 'HS256',
    expiresIn: 60 * 30,
    issuer: 'api.constructum.io',
  })

  const refreshToken = jwt.sign(payload, privateKey, {
    algorithm: 'HS256',
    expiresIn: 60 * 60 * 12,
    issuer: 'api.constructum.io',
  })

  return { access: accessToken, refresh: refreshToken }
}
