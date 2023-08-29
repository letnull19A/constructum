import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardFooter, CardHead, Content, Footer, Header, Menu } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutDefault } from '../../layouts/layout.default'
import { IInterceptors, Method, useHttp } from '../../hooks/hook.use-http'
import { useEffect, useState } from 'react'
import './Projects.scss'
import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { IJwtSet } from 'constructum-interfaces'
import configs from './../../configs/server.config.json'

export const Projects = () => {
  useTitle('Мои проекты')

  const navigate = useNavigate()
  const { requestWithInterceptors, request, error, response } = useHttp()
  const tokens = JSON.parse(localStorage.getItem('token') ?? '{}')
  const userData = JSON.parse(localStorage.getItem('user') ?? '{}')
  const bearer = 'Bearer ' + tokens.access
  const [projects, setProjects] = useState<Array<Object> | null>(null)
  const userTokens = JSON.parse(localStorage.getItem('token') ?? '{}') as IJwtSet

  useEffect(() => {
    const interceptor: IInterceptors = {
      onError: async (error: AxiosError) => {
        const original = error.config

        const data = qs.stringify({
          refresh: userTokens.refresh,
        })
 
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
          const response = await request({
            url: `${configs.auth}/api/refresh`,
            method: Method.POST,
            data: data,
          })

          console.log(response?.data, response?.data.access)

          localStorage.setItem(
            'token',
            JSON.stringify({ access: response?.data.access, refresh: response?.data.refresh }),
          )
          request({ url: original?.url ?? '', method: original?.method ?? '' })
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
        method: Method.GET,
        url: `${configs.api}/api/user/${userData.id}/projects`,
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
      interceptor,
    )
  }, [])

  useEffect(() => {
    setProjects(response)
  }, [response])

  return (
    <LayoutDefault>
      <Menu />
      <Header />
      <Content className="projects-content">
        <h1>Мои проекты</h1>
        <Button label="Добавить новый проект" onClick={() => navigate('/project/new')} />
        <div className="project-list">
          {error === null && projects !== null
            ? projects.map((project, index) => (
                <Card key={index} className="project-item">
                  <CardHead>{project.name}</CardHead>
                  <CardContent>{project.description}</CardContent>
                  <CardFooter>
                    <Button
                      label="Просмотр"
                      onClick={() => {
                        navigate(`/project/${project._id}`)
                      }}
                    />
                  </CardFooter>
                </Card>
              ))
            : <p>Не удалось загрузить проекты =(</p>}
        </div>
      </Content>
      <Footer />
    </LayoutDefault>
  )
}
