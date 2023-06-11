import { useEffect, useState } from 'react'
import './../../scss/style.general.scss'
import './App.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthRouting } from '../../routers/router.auth'
import { PublicRouting } from '../../routers/router.public'
import { AuthContext } from '../../contexts/context.user'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()
  const [user, setUser] = useState<string>('')

  const value = { isAuthenticated, user, setIsAuthenticated, setUser }

  useEffect(() => {
    setIsAuthenticated(
      localStorage.getItem('token') !== null &&
        localStorage.getItem('token') !== undefined &&
        localStorage.getItem('token') !== '',
    )
    setUser(JSON.parse(localStorage.getItem('token') ?? '{}'))
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <PublicRouting />
          <AuthRouting />
        </div>
      </Router>
    </AuthProvider>
  )
}
