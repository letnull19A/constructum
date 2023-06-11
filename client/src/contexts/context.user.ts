import { createContext } from 'react'

export interface IUserData {
  id: string
  name: string
  email: string
  surname: string
  nickname: string
}

export interface IUserContext {
  isAuthenticated: boolean
  user: IUserData
  setUser: (user: IUserData | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const AuthContext = createContext<IUserContext>(null!)
