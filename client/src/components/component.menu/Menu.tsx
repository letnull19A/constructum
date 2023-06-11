import { Link } from 'react-router-dom'
import './Menu.scss'

export const Menu = () => {
  return (
    <div className="menu">
      <Link to="/project">Мои проекты</Link>
    </div>
  )
}
