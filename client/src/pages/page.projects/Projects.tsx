import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardFooter, CardHead, Content, Footer, Header, Menu } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutDefault } from '../../layouts/layout.default'
import './Projects.scss'

export const Projects = () => {
  useTitle('Мои проекты')
  const navigate = useNavigate()

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
