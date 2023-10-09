import { useRef } from 'react'
import { Button, Content, Footer, Form, Header, Menu, Textbox } from '../../components'
import { LayoutDefault } from '../../layouts/layout.default'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { IJwtSet } from 'constructum-interfaces'
import qs from 'qs'
import './AddEntity.scss'
import { useParams } from 'react-router-dom'

export const AddEntity = () => {
  const entityName = useRef<HTMLInputElement>(null)
  const addEntityRequest = useHttp()
  const userTokens = JSON.parse(localStorage.getItem('token') ?? '{}') as IJwtSet
  const bearer = 'Bearer ' + userTokens.access
  const { id } = useParams()

  const add = () => {
    addEntityRequest.requestWithInterceptors(
      {
        method: Method.POST,
        url: `${import.meta.env.VITE_API_URL}/api/project/${id}/entities`,
        data: qs.stringify({
          name: entityName.current?.value,
        }),
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
  }

  return (
    <LayoutDefault>
      <Header />
      <Menu />
      <Content className="add-entity-content">
        <Form className="add-form" formTitle="Добавление сущности">
          <Textbox forwardref={entityName} label="Название сущности" placeholder="К примеру users" dangerText="" />
          <Button onClick={() => add()} label="Перейдти в конструктор" />
        </Form>
      </Content>
      <Footer />
    </LayoutDefault>
  )
}
