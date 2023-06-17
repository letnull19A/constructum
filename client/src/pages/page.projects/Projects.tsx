import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardFooter, CardHead, Content, Footer, Header, Menu } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutDefault } from '../../layouts/layout.default'
import './Projects.scss'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { useEffect } from 'react'

export const Projects = () => {
  useTitle('Мои проекты')
  const navigate = useNavigate()

  const { requestWithInterceptors, error } = useHttp()
  const tokens = JSON.parse(localStorage.getItem('token') ?? '{}')
  const bearer = 'Bearer ' + tokens.access

  useEffect(() => {
    requestWithInterceptors({
      method: Method.GET,
      url: 'http://localhost:7161/api/project',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify({
        id: JSON.parse(localStorage.getItem('user') ?? '{}').id,
      }),
    })
  }, [])

  return (
    <LayoutDefault>
      <Menu />
      <Header />
      <Content className="projects-content">
        <h1>Мои проекты</h1>

        {error === null ? (
          <>
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
          </>
        ) : null}
      </Content>
      <Footer />
    </LayoutDefault>
  )
}
