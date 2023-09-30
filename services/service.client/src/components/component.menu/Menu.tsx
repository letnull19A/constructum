import { Link } from 'react-router-dom'
import './Menu.scss'

export const Menu = () => {
	return (
		<div className="menu">
				<div className="header-title">
					<span>constructum</span>
				</div>
			<div className="menu-container">
				<Link to="/account">Мой аккаунт</Link>
				<Link to="/project">Мои проекты</Link>
				<Link to="/templates">Мои шаблоны</Link>
			</div>
		</div>
	)
}
