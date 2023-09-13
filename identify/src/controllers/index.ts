import { MongoDBWrapper } from "constructum-dbs"

/**
 * @description main tRPC controllers
*/
export const trpcController = {
	/**
	 * @description ping server, response equal message
	 * @param message - is inner message
	*/
	pingPong: (message: string) => {
		return `pong: ${message}`
	},
	/**
	 * @description controller whose find user by login and identify him
	 * @param login - login field
	*/
	identity: async (login: string): Promise<boolean> => {

		const mongo = new MongoDBWrapper(process.env.MONGO_CONNECTION)

		const client = await mongo.connect()

		mongo.disconnect()

		return true
	}
}
