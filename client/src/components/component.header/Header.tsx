import { Link } from 'react-router-dom'
import './Header.scss'

export const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <span>constructum</span>
      </div>
      <div className="header-account">
        <Link to="/login">Войти</Link>
        <Link to="/registration">Регистрация</Link>
      </div>
    </header>
  )
}
