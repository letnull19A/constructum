import { createClient } from 'redis'

export const cilent = createClient({ url: 'redis://127.0.0.1:6379' })

export const connect = async () => {
  cilent.on('error', (err) => console.error(err))

  if (!cilent.isOpen) {
    await cilent.connect()
  }
}

export const disconnect = async () => {
  cilent.on('error', (err) => console.error(err))

  if (cilent.isOpen) {
    await cilent.quit()
  }
}
