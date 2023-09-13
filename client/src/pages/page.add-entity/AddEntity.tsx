import { useRef } from 'react'
import { Button, Content, Footer, Form, Header, Menu, Textbox } from '../../components'
import { LayoutDefault } from '../../layouts/layout.default'
import { IInterceptors, Method, useHttp } from '../../hooks/hook.use-http'
import { AxiosError } from 'axios'
import { IJwtSet } from 'constructum-interfaces'
import qs from 'qs'
import './AddEntity.scss'
import { useNavigate, useParams } from 'react-router-dom'

export const AddEntity = () => {
  const entityName = useRef<HTMLInputElement>(null)
  const addEntityRequest = useHttp()
  const userTokens = JSON.parse(localStorage.getItem('token') ?? '{}') as IJwtSet
  const bearer = 'Bearer ' + userTokens.access
  const navigate = useNavigate()
  const { id } = useParams()

  const interceptor: IInterceptors = {
    onError: async (error: AxiosError) => {
      const original = error.config

      const data = qs.stringify({
        refresh: userTokens.refresh,
      })

      if (error.code === AxiosError.ERR_BAD_REQUEST) {
        const response = await addEntityRequest.request({
          url: 'http://localhost:3005/api/refresh',
          method: Method.POST,
          data: data,
        })

        console.log(response?.data, response?.data.access)

        localStorage.setItem(
          'token',
          JSON.stringify({ access: response?.data.access, refresh: response?.data.refresh }),
        )
        addEntityRequest.request({ url: original?.url ?? '', method: original?.method ?? '' })
      }

      return await error
    },
  }

  const add = () => {
    addEntityRequest.requestWithInterceptors(
      {
        method: Method.POST,
        url: `http://localhost:7161/api/project/${id}/entities`,
        data: qs.stringify({
          name: entityName.current?.value,
        }),
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
      interceptor,
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
