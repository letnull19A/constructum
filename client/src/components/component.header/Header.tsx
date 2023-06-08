import './Header.scss'

export const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <span>constructum</span>
      </div>
      <div className="header-account">
        <a href="/login">Войти</a>
        <a href="/registration">Регистрация</a>
      </div>
    </header>
  )
}
