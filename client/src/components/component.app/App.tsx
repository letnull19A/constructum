import { useEffect, useState } from 'react'
import './../../scss/style.general.scss'
import './App.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthRouting } from '../../routers/router.auth'
import { PublicRouting } from '../../routers/router.public'
import { AuthContext } from '../../contexts/context.user'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('token') !== null &&
      localStorage.getItem('token') !== undefined &&
      localStorage.getItem('token') !== '',
  )
  const [user, setUser] = useState<any>(null!)

  const value = { isAuthenticated, user }

  useEffect(() => {
    setIsAuthenticated(true)
    setUser('1')
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
