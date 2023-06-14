import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardFooter, CardHead, Content, Footer, Header, Menu } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutDefault } from '../../layouts/layout.default'
import './Projects.scss'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { useEffect } from 'react'
import qs from 'qs'

export const Projects = () => {
  useTitle('Мои проекты')
  const navigate = useNavigate()

  const { request, error, statusCode, response } = useHttp()

  useEffect(() => {
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('token')).access

    request({
      method: Method.GET,
      url: 'http://localhost:7161/api/project',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        id: localStorage.getItem('user').id,
      }),
    })
  }, [])

  useEffect(() => {
    console.log(response)
  }, [error, statusCode])

  return (
    <LayoutDefault>
      <Menu />
      <Header />
      <Content className="projects-content">
        <h1>Мои проекты</h1>
        <Button label="Добавить новый проект" onClick={() => navigate('/project/new')} />
        <div className="project-list">
          <Card className="project-item">
            <CardHead>Заголовок этого проекта</CardHead>
            <CardContent>Описание разрабатываемого проекта</CardContent>
            <CardFooter>
              <Button label="Просмотр" />
            </CardFooter>
          </Card>
        </div>
      </Content>
      <Footer />
    </LayoutDefault>
  )
}
