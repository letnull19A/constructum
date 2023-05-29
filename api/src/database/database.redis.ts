import { createClient } from 'redis'

export const cilent = createClient()

export const connect = async () => {
  cilent.on('error', (err) => console.error(err))

  await cilent.connect()
}

export const disconnect = async () => {
  await cilent.quit()
}
