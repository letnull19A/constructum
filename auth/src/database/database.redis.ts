import { env } from 'process'
import { createClient } from 'redis'
import { $log as logger } from '@tsed/logger'

export const client = createClient({ url: env.REDIS_URL })

export const connect = async () => {
  client.on('error', (err) => logger.error(err))
  client.on('ready', () => logger.info('Redis is ready'))

  if (!client.isOpen) {
    await client.connect()
  }
}

export const disconnect = async () => {
  client.on('error', (err) => logger.error(err))

  if (client.isOpen) {
    await client.disconnect()
  }
}
