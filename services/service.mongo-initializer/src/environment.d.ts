declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_CONNECTION: string
      DATA_BASE: string
    }
  }
}

export {}
