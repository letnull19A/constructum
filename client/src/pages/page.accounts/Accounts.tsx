import { IJwtPayload } from 'constructum-interfaces'
import { useState, useEffect } from 'react'
import { Header, CardHead, Content, Card, Footer, CardContent, CardFooter, Button, CardImage } from '../../components'
import { LayoutFlat } from '../../layouts/layout.flat'
import './Accounts.scss'
import { useNavigate } from 'react-router-dom'

export const Accounts = () => {
	const [findedAccounts, setFindedAccouts] = useState<IJwtPayload>()
	const navigate = useNavigate()

	useEffect(() => {
		const usersData = localStorage.getItem('user')

		if (usersData !== '' && usersData !== undefined && usersData !== null) {
			setFindedAccouts(JSON.parse(usersData))
		}
	}, [])

	return (
		<LayoutFlat>
			<Header />
			<Content className="accounts-content">
				<h2>Найденные аккаунты</h2>
				<Card className="accounts-form">
					<CardImage>
						<img src="https://imgholder.ru/320x200/9f9f9f/fff&text=IMAGE+HOLDER&font=arial" />
					</CardImage>
					<CardHead>
						{findedAccounts?.name} {findedAccounts?.surname}
					</CardHead>
					<CardContent>Продолжить как {findedAccounts?.nickname}</CardContent>
					<CardFooter>
						<Button onClick={() => navigate(`/login/${findedAccounts?.nickname}`)} label="Войти" />
					</CardFooter>
				</Card>
			</Content>
			<Footer />
		</LayoutFlat>
	)
}
