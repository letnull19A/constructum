import express from 'express'
import User, { IUser } from './../schemas/scheme.user.js'
import { generateJwtSet } from './../services/index.js'
import { comparePassword } from './../services/service.salt.js'
import { Session } from './../services/service.session.js'
import { isNotAuth } from './../middlewares/middleware.not-auth.js'
import { $log as logger } from '@tsed/logger'
import { IJwtPayload, IAuthResponse } from 'constructum-interfaces'
import { RedisDBWrapper } from 'constructum-dbs'
import { trpcClient } from 'constructum-identify'
import mongoose, { Mongoose } from 'mongoose'

export const authRoute = express.Router()

const redis = new RedisDBWrapper(process.env.REDIS_URL)
const session = new Session(redis)

authRoute.post('/auth', isNotAuth, async (req, res) => {
	const { login, password } = req.body

	if (login === undefined || login === '') {
		res.status(400).send('login is undefined or empty')
		return
	}

	if (password === undefined || password === '') {
		res.status(400).send('password is undefined or empty')
		return
	}

	await redis.connect()

	const identifyClient = trpcClient('localhost', 3498)

	const identify = await identifyClient.identity.query({
		mongoConnection: process.env.MONGO_CONNECTION,
		userLogin: login
	})

	if (identify?.password === null || identify?.password === undefined) {
		res.status(404).send('passwords is not defined')
		return
	}

	const comparedPassword = await comparePassword(password.toString(), identify?.password)

	if (!comparedPassword) {
		res.status(404).send('user not found')
		return
	}

	const { name, surname, email } = identify

	const payload: IJwtPayload = {
		id: identify._id.toString(),
		nickname: identify.login as string,
		name: name as string,
		surname: surname as string,
		email: email as string
	}

	const jwtTokens = generateJwtSet(payload)

	await session.start(jwtTokens.refresh.toString(), JSON.stringify(jwtTokens))

	await redis.disconnect()

	const response: IAuthResponse = {
		tokens: jwtTokens,
		user: payload
	}

	res.status(200).send(response)
})
