declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      MONGO_CONNECTION: string
    }
  }
}

export {}
