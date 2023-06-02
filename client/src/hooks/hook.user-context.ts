import { useContext } from 'react'
import { IUserContext, AuthContext } from '../contexts/context.user'

export const useUserContext = () => {
  return useContext<IUserContext>(AuthContext)
}
