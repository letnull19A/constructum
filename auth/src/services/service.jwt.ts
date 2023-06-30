import jwt from 'jsonwebtoken'
import fs from 'fs'
import path, { dirname } from 'path'
import { IJwtAccessToken, IJwtPayload, IJwtRefreshToken, IJwtSet } from 'constructum-interfaces'

const { TokenExpiredError } = jwt

export const generateJwtSet = (payload: IJwtPayload): IJwtSet => {
	const accessToken = generateAccessToken(payload)
	const refreshToken = generateRefreshToken(payload)

	return { access: accessToken, refresh: refreshToken }
}

export const generateAccessToken = (payload: IJwtPayload): string => {
	const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
	const privateKey = fs.readFileSync(pathToKey).toString()

	const accessToken = jwt.sign(payload, privateKey, {
		algorithm: 'HS256',
		expiresIn: 60 * 5,
		issuer: 'api.constructum.io'
	})

	return accessToken
}

export const generateRefreshToken = (payload: IJwtPayload): string => {
	const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
	const privateKey = fs.readFileSync(pathToKey).toString()

	const refreshToken = jwt.sign(payload, privateKey, {
		algorithm: 'HS256',
		expiresIn: 60 * 30,
		issuer: 'api.constructum.io'
	})

	return refreshToken
}

export const isVerifyAccessToken = (accessToken: IJwtAccessToken): boolean => {
	try {
		const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
		const privateKey = fs.readFileSync(pathToKey).toString()

		const result = jwt.verify(accessToken.access, privateKey)

		return result !== null && result !== undefined && result !== ''
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return false
		}
	}

	return false
}

export const isVerifyRefreshToken = (token: IJwtRefreshToken): boolean => {
	try {
		const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
		const privateKey = fs.readFileSync(pathToKey).toString()

		const result = jwt.verify(token.refresh, privateKey)

		return result !== null && result !== undefined && result !== ''
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return false
		}
	}

	return false
}
