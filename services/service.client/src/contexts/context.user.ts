import { createContext } from 'react'
import { IJwtPayload } from 'constructum-interfaces'

export interface IUserContext {
  isAuthenticated: boolean | undefined
  user: IJwtPayload | null
  setUser: (user: IJwtPayload | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const AuthContext = createContext<IUserContext>(null!)
export { type IJwtPayload }
