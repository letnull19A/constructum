import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardContent, CardFooter, CardHead, Content, Footer, Header, Menu } from '../../components'
import { LayoutDefault } from '../../layouts/layout.default'
import './ViewProject.scss'
import { useEffect, useState } from 'react'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { IEntity, IProject } from 'constructum-interfaces'

export const ViewProject = () => {
  const tokens = JSON.parse(localStorage.getItem('token') ?? '{}')
  const navigate = useNavigate()
  const { id } = useParams()
  const { requestWithInterceptors, response } = useHttp<IProject>()
  const bearer = 'Bearer ' + tokens.access
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    requestWithInterceptors({
      method: Method.GET,
      url: `http://localhost:7161/api/project/${id}`,
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }, [])

  useEffect(() => {
    if (response !== undefined && response !== null) {
      setTitle(response.name)
    }
  }, [response])

  const goToConstructor = (entity_id: any) => {
    navigate(`/project/${id}/entities/${entity_id}/constructor`)
  }

  return (
    <LayoutDefault>
      <Header />
      <Content className="view-content">
        <div className="toolbar">
          <h2>{title}</h2>
          <Button onClick={() => navigate(`/project/${id}/entities/add`)} label="Создать сущность" />
          <Button label="Перейдти к схеме" />
          <Button label="О проекте" />
          <Button label="Собрать проект" />
        </div>
        <div className="section">
          <h3>Сущности</h3>
          <div className="entites-list">
            {response?.entities?.map((item, index) => (
              <Card className="entity-card">
                <CardHead className="entity-head">{item.name}</CardHead>
                <CardContent className="entity-fields">
                  <ul></ul>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => goToConstructor(item._id)} label="В конструктор" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Content>
      <Menu />
      <Footer />
    </LayoutDefault>
  )
}
