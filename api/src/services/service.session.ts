import { cilent, connect, disconnect } from '../database/database.redis.js'

export const startSession = async (key: string | undefined, payload: any) => {
  if (key === undefined) {
    throw new Error('Ключ не определён')
  }

  await cilent.set(key, payload)
}

export const endSesison = async (key: string) => {
  await cilent.del(key)
}

export const sessionIsAvalible = async (key: string): Promise<boolean> => {
  if (!cilent.isOpen) {
    await connect()
  }

  const userId = await cilent
    .get(key)
    .then()
    .catch((e) => {
      console.error(e)
    })

  await disconnect()

  return userId !== null && userId !== undefined && userId !== ''
}
