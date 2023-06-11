import { Content, Footer, Header, Menu } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutDefault } from '../../layouts/layout.default'
import './Projects.scss'

export const Projects = () => {
  useTitle('Мои проекты')

  return (
    <LayoutDefault>
      <Menu />
      <Header />
      <Content className="projects-content"></Content>
      <Footer />
    </LayoutDefault>
  )
}
