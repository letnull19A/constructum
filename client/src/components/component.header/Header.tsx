import './Header.scss'

export const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <span>constructum</span>
      </div>
      <div className="header-account">
        <a href="#">Войти</a>
        <a href="#">Регистрация</a>
      </div>
    </header>
  )
}
