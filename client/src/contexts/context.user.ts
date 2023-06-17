import { createContext } from 'react'
import { IJwtPayload } from '../interfaces'

export interface IUserContext {
  isAuthenticated: boolean | undefined
  user: IJwtPayload
  setUser: (user: IJwtPayload | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const AuthContext = createContext<IUserContext>(null!)
export { type IJwtPayload }
