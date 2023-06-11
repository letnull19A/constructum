import { Link } from 'react-router-dom'
import './Header.scss'
import { useUserContext } from '../../hooks/hook.user-context'
import { IUserContext } from '../../contexts/context.user'

export const Header = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useUserContext()

  const handleLogout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
    setUser(null)
  }

  const parsedData = JSON.parse(localStorage.getItem('user') ?? '{}') as IUserContext

  return (
    <header className="header">
      <div className="header-title">
        <span>constructum</span>
      </div>
      <div className="header-account">
        {!isAuthenticated && (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/registration">Регистрация</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/login" onClick={() => handleLogout()}>
              Выйти
            </Link>
            <Link to="/account">{parsedData.user.nickname}</Link>
          </>
        )}
      </div>
    </header>
  )
}
