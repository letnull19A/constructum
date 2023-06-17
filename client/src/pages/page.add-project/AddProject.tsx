import { useEffect, useRef } from 'react'
import { Button, Content, Footer, Form, Header, Textarea, Textbox } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutFlat } from '../../layouts/layout.flat'
import { Method, useHttp, IInterceptors } from '../../hooks/hook.use-http'
import { useNavigate } from 'react-router-dom'
import { IJwtPayload, IJwtSet, IProjectCreate } from '../../interfaces'
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export const AddProject = () => {
  useTitle('Создание нового проекта')

  const { requestWithInterceptors, request, statusCode, error } = useHttp()

  const nameFieldRef = useRef<HTMLInputElement>(null)
  const surnameFieldRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const handleCreateProject = () => {
    const userTokens = JSON.parse(localStorage.getItem('token') ?? '{}') as IJwtSet
    const userData = JSON.parse(localStorage.getItem('user') ?? '{}') as IJwtPayload

    if (nameFieldRef.current && surnameFieldRef.current) {
      const data: IProjectCreate = {
        owner: userData.id,
        name: nameFieldRef.current.value,
        description: surnameFieldRef.current.value,
      }

      const interceptor: IInterceptors = {
        onError: async (error: AxiosError) => {
          const original = error.config

          const formData = new FormData()
          formData.append('refresh', userTokens.refresh)

          if (error.code === AxiosError.ERR_BAD_REQUEST) {
            const response = await request({
              url: 'http://localhost:7161/api/refresh',
              method: Method.GET,
              data: formData,
            })

            console.log(response)

            // localStorage.setItem('token', response)
            // request({ url: original?.url ?? '', method: Method.POST })
          }

          return await error
        },
        onRequest: (config: InternalAxiosRequestConfig) => {
          return config
        },
        onResponse: (response: AxiosResponse) => {
          return response
        },
      }

      requestWithInterceptors(
        {
          method: Method.POST,
          url: 'http://localhost:7161/api/project',
          headers: {
            Authorization: `Bearer ${userTokens.access}`,
          },
          data: data,
        },
        interceptor,
      )
    }
  }

  useEffect(() => {
    if (statusCode === 200 && nameFieldRef.current && surnameFieldRef.current) {
      setTimeout(() => {
        navigate('/project')
      }, 2000)
    }
  }, [error, statusCode])

  return (
    <LayoutFlat>
      <Header />
      <Content className="login-content">
        <Form className="login-form" formTitle="Новый проект">
          <Textbox forwardref={nameFieldRef} label="Название проекта" placeholder="К примеру: Proj - 1" dangerText="" />
          <Textarea
            forwardref={surnameFieldRef}
            label="Описание проекта"
            placeholder="К примеру: проект базы данных по бух. учёту"
            dangerText=""
          />
          <Button onClick={handleCreateProject} label="Создать" />
        </Form>
      </Content>
      <Footer />
    </LayoutFlat>
  )
}
