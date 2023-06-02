import { createContext } from 'react'

export interface IUserContext {
  isAuthenticated: boolean
  user: any
}

export const AuthContext = createContext<IUserContext>(null!)
