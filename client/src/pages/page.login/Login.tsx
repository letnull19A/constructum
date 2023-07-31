import { useEffect, useRef, useState } from 'react'
import { Button, Card, Content, Footer, Form, Header, Textbox } from '../../components'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutFlat } from '../../layouts/layout.flat'
import './Login.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserContext } from '../../hooks/hook.user-context'
import { IAuthResponse, IJwtPayload } from 'constructum-interfaces'
import qs from 'qs'
import { Link } from 'react-router-dom'

export const Login = () => {
	useTitle('Войти')

	const { request, statusCode, error, response, loading } = useHttp()
	const loginFieldRef = useRef<HTMLInputElement>(null)
	const passwordFieldRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const { setUser, setIsAuthenticated } = useUserContext()
	const [findedAccounts, setFindedAccouts] = useState<IJwtPayload>()
	const { nickname } = useParams()

	const handleLogin = () => {
		if (loginFieldRef.current && passwordFieldRef.current) {
			const login = loginFieldRef.current.value
			const password = passwordFieldRef.current.value

			request({
				method: Method.POST,
				url: 'http://localhost:3005/api/auth',
				headers: {
					Authorization: 'Bearer 0'
				},
				data: qs.stringify({
					login: login,
					password: password
				})
			})
		}
	}

	useEffect(() => {
		const usersData = localStorage.getItem('user')

		if (usersData !== '' && usersData !== undefined && usersData !== null) {
			setFindedAccouts(JSON.parse(usersData))
		}
	}, [])

	useEffect(() => {
		if (statusCode === 200 && loginFieldRef.current && passwordFieldRef.current) {
			loginFieldRef.current.disabled = true
			passwordFieldRef.current.disabled = true

			setTimeout(() => {
				const parsedData = JSON.parse(JSON.stringify(response)) as IAuthResponse

				localStorage.setItem(
					'token',
					JSON.stringify({
						access: parsedData.tokens.access,
						refresh: parsedData.tokens.refresh
					})
				)
				localStorage.setItem(
					'user',
					JSON.stringify({
						id: parsedData.user.id,
						name: parsedData.user.name,
						surname: parsedData.user.surname,
						email: parsedData.user.email,
						nickname: parsedData.user.nickname
					})
				)

				setUser(parsedData.user)
				setIsAuthenticated(true)

				navigate('/project')
			}, 2000)
		}
	}, [error, statusCode])

	return (
		<LayoutFlat>
			<Header />
			<Content className="login-content">
				<Card className="login-form">
					<Form formTitle="Войти">
						<Textbox
							disabled={loading}
							forwardref={loginFieldRef}
							type="text"
							label="Логин"
							placeholder="Введите Ваш логин"
							dangerText=""
							value={nickname}
						/>
						<Textbox
							disabled={loading}
							forwardref={passwordFieldRef}
							type="password"
							placeholder="Введите Ваш пароль"
							label="Пароль"
							dangerText=""
						/>
						<Button type='primary' outline onClick={handleLogin} label="Войти" />
						<Link to='/accounts'>
							{findedAccounts !== undefined || findedAccounts !== null ? 'Найдены другие аккаунты' : null}
						</Link>
						{statusCode === 404 && error}
					</Form>
				</Card>
			</Content>
			<Footer />
		</LayoutFlat>
	)
}
