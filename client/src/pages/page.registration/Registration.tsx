import { Button, Content, Footer, Form, Header, Textbox } from '../../components'
import { LayoutFlat } from '../../layouts/layout.flat'

export const Registration = () => {
  return (
    <LayoutFlat>
      <Header />
      <Content className="login-content">
        <Form className="login-form" formTitle="Регистрация">
          <Textbox label="Ваше имя" placeholder="К примеру: Алексей" dangerText="" />
          <Textbox label="Ваше фамилия" placeholder="К примеру: Алексеев" dangerText="" />
          <Textbox label="Никнейм" placeholder="К примеру: _Xarlein_" dangerText="" />
          <Textbox type="email" label="E-Mail" placeholder="К примеру: alex@mail.ru" dangerText="" />
          <Textbox type="password" label="Пароль" dangerText="" />
          <Textbox type="password" label="Подтвердите пароль" dangerText="" />
          <Button label="Зарегистрироваться" />
        </Form>
      </Content>
      <Footer />
    </LayoutFlat>
  )
}
