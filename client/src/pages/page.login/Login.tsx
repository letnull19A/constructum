import { Button, Content, Footer, Form, Header, Textbox } from '../../components'
import { LayoutFlat } from '../../layouts/layout.flat'
import './Login.scss'

export const Login = () => {
  return (
    <LayoutFlat>
      <Header />
      <Content className="login-content">
        <Form className="login-form" formTitle="Войти">
          <Textbox label="Логин" placeholder="Введите Ваш логин" dangerText="" />
          <Textbox type="password" placeholder="Введите Ваш пароль" label="Пароль" dangerText="" />
          <Button label="Войти" />
        </Form>
      </Content>
      <Footer />
    </LayoutFlat>
  )
}
