declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      REDIS_URL: string
      MONGO_CONNECTION: string
    }
  }
}

export {}
