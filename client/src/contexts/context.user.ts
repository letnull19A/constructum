import { createContext } from 'react'

export interface IUserContext {
  isAuthenticated: boolean
  user: string
  setUser: (user: string) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const AuthContext = createContext<IUserContext>(null!)
