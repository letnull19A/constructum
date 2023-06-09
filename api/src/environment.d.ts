declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      MONGO_CONNECTION: string
      REDIS_URL: string
      REDIS_PORT: number
      REDIS_HOST: string
    }
  }
}

export {}
