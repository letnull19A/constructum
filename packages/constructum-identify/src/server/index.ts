import { router, publicProcedure } from './trpc.router'
import z from 'zod'
import { userSchema } from 'constructum-schemes'
import { TRPCError } from '@trpc/server'
import { $log as logger } from '@tsed/logger'
import mongoose from 'mongoose'

export const appRouter = router({
	ping: publicProcedure
		.input(z.string())
		.query(async () => {
		return 'pong'
	}),
	identity: publicProcedure
		.input(z.object({ mongoConnection: z.string(), userLogin: z.string() }))
		.query(async (opts) => {
			const { input } = opts

			logger.info(`accepted new query: identity`)

			if (input.mongoConnection === undefined || input.mongoConnection === '') {
				logger.error('missed mongoConnection')

				const error: TRPCError = {
					name: 'i miss mongoConnection',
					code: 'INTERNAL_SERVER_ERROR',
					message: 'mongoConnection is not found'
				}

				return error
			}

			if (input.userLogin === undefined || input.userLogin === '') {
				const error: TRPCError = {
					name: 'validation failed',
					code: 'BAD_REQUEST',
					message: 'login is not defined of empty'
				}

				return error
			}

			const y = await mongoose.connect(input.mongoConnection)

			const U = y.models.User || y.model('User', userSchema)

			const i = await U.findOne({ login: input.userLogin })
				.then(async (data: any) => {

					logger.debug(data)

					await mongoose.disconnect()

					return data
				})
				.catch((e: any) => {
					logger.error(e)

					const error: TRPCError = {
						name: 'validation failed',
						code: 'INTERNAL_SERVER_ERROR',
						message: e
					}

					return error
				})

			logger.debug(i)

			return i
		})
})

export type AppRouter = typeof appRouter
