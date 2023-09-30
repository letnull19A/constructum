declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      REDIS_URL: string
      MONGO_CONNECTION: string
      IDENTIFY_SERVER: string 
      CORS_ENABLED: boolean
    }
  }
}

export {}
