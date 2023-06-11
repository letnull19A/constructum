import { useEffect, useRef } from 'react'
import { Button, Content, Footer, Form, Header, Textbox } from '../../components'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutFlat } from '../../layouts/layout.flat'
import './Login.scss'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../hooks/hook.user-context'

export const Login = () => {
  useTitle('Войти')
  const { request, statusCode, error, response } = useHttp()
  const loginFieldRef = useRef()
  const passwordFieldRef = useRef()
  const navigate = useNavigate()
  const { setUser, setIsAuthenticated } = useUserContext()

  const handleLogin = () => {
    const login = loginFieldRef.current.value
    const password = passwordFieldRef.current.value

    request({
      method: Method.POST,
      url: 'http://localhost:7161/api/auth',
      headers: {
        Authorization: 'Bearer 6474fe6b51cb50792799d4bf',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        login: login,
        password: password,
      }),
    })
  }

  useEffect(() => {
    if (statusCode === 200) {
      loginFieldRef.current.value = ''
      passwordFieldRef.current.value = ''

      localStorage.setItem('token', JSON.stringify(response))

      setUser(JSON.stringify(response))
      setIsAuthenticated(true)

      navigate('/scheme')
    }
  }, [error, statusCode])

  return (
    <LayoutFlat>
      <Header />
      <Content className="login-content">
        <Form className="login-form" formTitle="Войти">
          <Textbox forwardRef={loginFieldRef} type="text" label="Логин" placeholder="Введите Ваш логин" dangerText="" />
          <Textbox
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
}
