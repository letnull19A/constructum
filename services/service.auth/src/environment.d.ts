declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      REDIS_URL: string
      MONGO_CONNECTION: string
      IDENTIFY_ADDRESS: string
      CORS_ENABLED: boolean
      VERIFICATION_ATTEMPTS_OF_PING_TRPC: number
    }
  }
}

export {}
