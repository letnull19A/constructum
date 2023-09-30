import { env } from 'process'
import { createClient } from 'redis'
import { $log as logger } from '@tsed/logger'

export const client = createClient({ url: env.REDIS_URL })

logger.name = 'REDIS'

export const connect = async () => {
  try {
    client.on('error', (err) => logger.error(err))

    if (!client.isOpen) {
      logger.info(`connected now`)
      await client.connect()
    }
  } catch (error) {
    logger.error(error)
  }
}

export const disconnect = async () => {
  try {
    client.on('error', (err) => logger.error(err))

    if (client.isOpen) {
      await client.QUIT()
    }
  } catch (error) {
    logger.error(error)
  }
}
