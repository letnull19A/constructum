import { Button, Card, Content, Footer, Header, Menu } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutDefault } from '../../layouts/layout.default'
import './Projects.scss'

export const Projects = () => {
  useTitle('Мои проекты')

  return (
    <LayoutDefault>
      <Menu />
      <Header />
      <Content className="projects-content">
        <h1>Мои проекты</h1>
        <Button label="Добавить новый проект" />
        <div className="project-list">
          <Card className="project-item"></Card>
        </div>
      </Content>
      <Footer />
    </LayoutDefault>
  )
}
