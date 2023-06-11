import { useEffect, useRef } from 'react'
import { Button, Content, Footer, Form, Header, Textbox } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutFlat } from '../../layouts/layout.flat'
import { Method, useHttp } from '../../hooks/hook.use-http'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

export const Registration = () => {
  useTitle('Регистрация')

  const { request, statusCode, error, loading } = useHttp()

  const nameFieldRef = useRef<HTMLInputElement>(null)
  const surnameFieldRef = useRef<HTMLInputElement>(null)
  const emailFieldRef = useRef<HTMLInputElement>(null)
  const loginFieldRef = useRef<HTMLInputElement>(null)
  const passwordFieldRef = useRef<HTMLInputElement>(null)
  const confirmPasswordFieldRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleRegistration = () => {
    if (
      nameFieldRef.current &&
      surnameFieldRef.current &&
      emailFieldRef.current &&
      loginFieldRef.current &&
      passwordFieldRef.current &&
      confirmPasswordFieldRef.current
    ) {
      request({
        method: Method.POST,
        url: 'http://localhost:7161/api/registration',
        headers: {
          Authorization: 'Bearer 0',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          name: nameFieldRef.current.value,
          surname: surnameFieldRef.current.value,
          email: emailFieldRef.current.value,
          login: loginFieldRef.current.value,
          password: passwordFieldRef.current.value,
          repassword: confirmPasswordFieldRef.current.value,
        }),
      })
    }
  }

  useEffect(() => {
    if (
      statusCode === 200 &&
      nameFieldRef.current &&
      surnameFieldRef.current &&
      emailFieldRef.current &&
      loginFieldRef.current &&
      passwordFieldRef.current &&
      confirmPasswordFieldRef.current
    ) {
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
  }, [error, statusCode])

  return (
    <LayoutFlat>
      <Header />
      <Content className="login-content">
        <Form className="login-form" formTitle="Регистрация">
          <Textbox forwardRef={nameFieldRef} label="Ваше имя" placeholder="К примеру: Алексей" dangerText="" />
          <Textbox forwardRef={surnameFieldRef} label="Ваше фамилия" placeholder="К примеру: Алексеев" dangerText="" />
          <Textbox forwardRef={loginFieldRef} label="Никнейм" placeholder="К примеру: _Xarlein_" dangerText="" />
          <Textbox
            forwardRef={emailFieldRef}
            type="email"
            label="E-Mail"
            placeholder="К примеру: alex@mail.ru"
            dangerText=""
          />
          <Textbox forwardRef={passwordFieldRef} type="password" label="Пароль" dangerText="" />
          <Textbox forwardRef={confirmPasswordFieldRef} type="password" label="Подтвердите пароль" dangerText="" />
          <Button onClick={handleRegistration} label="Зарегистрироваться" />
        </Form>
      </Content>
      <Footer />
    </LayoutFlat>
  )
}
