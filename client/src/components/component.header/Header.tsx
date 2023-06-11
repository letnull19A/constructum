import { Link } from 'react-router-dom'
import './Header.scss'
import { useUserContext } from '../../hooks/hook.user-context'

export const Header = () => {
  const { isAuthenticated } = useUserContext()

  return (
    <header className="header">
      <div className="header-title">
        <span>constructum</span>
      </div>
      <div className="header-account">
        {!isAuthenticated ?? (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/registration">Регистрация</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/logout">Выйти</Link>
            <Link to="/account">nickname</Link>
          </>
        )}
      </div>
    </header>
  )
}
