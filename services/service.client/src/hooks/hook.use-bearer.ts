import { IJwtSet } from 'constructum-interfaces'
import { useEffect, useState } from 'react'

export const useBearer = () => {
  const [bearer, setBearer] = useState('')
  const [refresh, setRefresh] = useState('')
  const [access, setAccess] = useState('')

  useEffect(() => {

    const userTokens = JSON.parse(
      localStorage.getItem('token') ?? 
      JSON.stringify({ access: '', refresh: '' })) as IJwtSet

    setAccess(userTokens.access)
    setRefresh(userTokens.refresh)

    setBearer(`Bearer ${userTokens.access}`)
  }, [])

  return { bearer, access, refresh }
}