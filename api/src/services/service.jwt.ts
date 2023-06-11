import jwt from 'jsonwebtoken'
import fs from 'fs'
import path, { dirname } from 'path'

const { TokenExpiredError } = jwt

export interface IJwtSet {
  access: string
  refresh: string
}

export type ReadyJwtSet = null | IJwtSet

export const generateAccessToken = (payload: any): string => {
  const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
  const privateKey = fs.readFileSync(pathToKey).toString()

  const accessToken = jwt.sign(payload, privateKey, {
    algorithm: 'HS256',
    expiresIn: 60 * 1,
    issuer: 'api.constructum.io',
  })

  return accessToken
}

export const generateRefreshToken = (payload: any): string => {
  const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
  const privateKey = fs.readFileSync(pathToKey).toString()

  const refreshToken = jwt.sign(payload, privateKey, {
    algorithm: 'HS256',
    expiresIn: 60 * 60 * 12,
    issuer: 'api.constructum.io',
  })

  return refreshToken
}

export const generateJwtSet = (payload: any): ReadyJwtSet => {
  const accessToken = generateAccessToken(payload)
  const refreshToken = generateRefreshToken(payload)

  return { access: accessToken, refresh: refreshToken }
}

export const isVerifyAccessToken = (accessToken: any): boolean => {
  try {
    const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
    const privateKey = fs.readFileSync(pathToKey).toString()

    const result = jwt.verify(accessToken, privateKey)

    return result !== null && result !== undefined && result !== ''
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return false
    }
  }

  return false
}
