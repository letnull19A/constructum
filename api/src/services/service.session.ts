import { client, connect, disconnect } from '../database/database.redis.js'
import { $log as logger } from '@tsed/logger'
import { isVerifyAccessToken } from './service.jwt.js'
import { log } from 'console'

export const startSession = async (key: string | undefined, payload: any) => {
  if (key === undefined) {
    throw new Error('Ключ не определён')
  }

  await client.set(key, payload)
}

export const endSesison = async (key: string) => {
  await client.del(key)
}

export const sessionIsAvalible = async (key: string): Promise<boolean> => {
  try {
    await connect()

    const jwtToken = await client.get(key)

    log(jwtToken)
    isVerifyAccessToken(JSON.parse(jwtToken ?? '{}').access)

    return jwtToken !== null && jwtToken !== undefined && jwtToken !== ''
  } catch (e) {
    logger.error(e)
  } finally {
    await disconnect()
  }

  return false
}
