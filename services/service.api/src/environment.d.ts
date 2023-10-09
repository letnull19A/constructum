declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      MONGO_CONNECTION: string
      REDIS_URL: string
      REDIS_PORT: number
      REDIS_HOST: string
      COMPILER_TRPC_ADDRESS: string
      ENABLED_CORS: boolean
      VERIFICATION_ATTEMPTS_OF_PING_TRPC: number
    }
  }
}

export {}
