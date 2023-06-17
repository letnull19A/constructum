import { useEffect, useRef } from 'react'
import { Button, Content, Footer, Form, Header, Textbox } from '../../components'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutFlat } from '../../layouts/layout.flat'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../hooks/hook.user-context'
import { IAuthResponse } from 'constructum-interfaces'

export const Login = () => {
	useTitle('Войти')
	const { request, statusCode, error, response, loading } = useHttp()
	const loginFieldRef = useRef<HTMLInputElement>(null)
	const passwordFieldRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const { setUser, setIsAuthenticated } = useUserContext()

	const handleLogin = () => {
		if (loginFieldRef.current && passwordFieldRef.current) {
			const login = loginFieldRef.current.value
			const password = passwordFieldRef.current.value

      request({
        method: Method.POST,
        url: 'http://localhost:7161/api/auth',
        headers: {
          Authorization: 'Bearer 0',
        },
        data: {
          login: login,
          password: password,
        },
      })
    }
  }

	useEffect(() => {
		if (statusCode === 200 && loginFieldRef.current && passwordFieldRef.current) {
			loginFieldRef.current.disabled = true
			passwordFieldRef.current.disabled = true

			setTimeout(() => {
				const parsedData = JSON.parse(JSON.stringify(response)) as IAuthResponse

				localStorage.setItem(
					'token',
					JSON.stringify({ access: parsedData.tokens.access, refresh: parsedData.tokens.refresh })
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

<<<<<<< HEAD
	return (
		<LayoutFlat>
			<Header />
			<Content className="login-content">
				<Form className="login-form" formTitle="Войти">
					<Textbox
						disabled={loading}
						forwardRef={loginFieldRef}
						type="text"
						label="Логин"
						placeholder="Введите Ваш логин"
						dangerText=""
					/>
					<Textbox
						disabled={loading}
						forwardRef={passwordFieldRef}
						type="password"
						placeholder="Введите Ваш пароль"
						label="Пароль"
						dangerText=""
					/>
					<Button onClick={handleLogin} label="Войти" />
					{statusCode === 404 && error}
				</Form>
			</Content>
			<Footer />
		</LayoutFlat>
	)
=======
  return (
    <LayoutFlat>
      <Header />
      <Content className="login-content">
        <Form className="login-form" formTitle="Войти">
          <Textbox
            disabled={loading}
            forwardref={loginFieldRef}
            type="text"
            label="Логин"
            placeholder="Введите Ваш логин"
            dangerText=""
          />
          <Textbox
            disabled={loading}
            forwardref={passwordFieldRef}
            type="password"
            placeholder="Введите Ваш пароль"
            label="Пароль"
            dangerText=""
          />
          <Button onClick={handleLogin} label="Войти" />
          {statusCode === 404 && error}
        </Form>
      </Content>
      <Footer />
    </LayoutFlat>
  )
>>>>>>> v_0.0.1.snapshot.5
}
