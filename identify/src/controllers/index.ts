import { MongoDBWrapper } from "constructum-dbs"

export const trpcController = {
	ping: (message: string) => {
		return `pong: ${message}`
	},
	identify: async (login: string): Promise<boolean> => {

		const mongo = new MongoDBWrapper(process.env.MONGO_CONNECTION)

		const client = await mongo.connect()

		

		mongo.disconnect()

		return true
	}
}
