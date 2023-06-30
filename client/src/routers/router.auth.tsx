import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Header, Menu, Footer, Canvas, Content } from '../components'
import { LayoutDefault } from '../layouts/layout.default'
import { Projects } from '../pages/page.projects/Projects'
import { AddProject } from '../pages/page.add-project/AddProject'
import { Account, AddEntity, EntityConstructor, ViewProject } from '../pages'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()

  let element = children

  if (localStorage.getItem('token') === null) {
    element = <Navigate to="/login" state={{ from: location }} replace />
  }

  return element
}

export const AuthRouting = () => {
  return (
    <Routes>
      <Route
        path="/project"
        element={
          <RequireAuth>
            <Projects />
          </RequireAuth>
        }
      />
      <Route
        path="/project/new"
        element={
          <RequireAuth>
            <AddProject />
          </RequireAuth>
        }
      />
      <Route
        path="/scheme"
        element={
          <RequireAuth>
            <LayoutDefault>
              <Header />
              <Menu />
              <Content>
                <Canvas />
              </Content>
              <Footer />
            </LayoutDefault>
          </RequireAuth>
        }
      />
      <Route
        path="/account"
        element={
          <RequireAuth>
            <Account />
          </RequireAuth>
        }
      />
      <Route
        path="/project/:id"
        element={
          <RequireAuth>
            <ViewProject />
          </RequireAuth>
        }
      />
      <Route
        path="project/:id/entities/add"
        element={
          <RequireAuth>
            <AddEntity />
          </RequireAuth>
        }
      />
      <Route
        path="project/:id/entities/:entity_id/constructor"
        element={
          <RequireAuth>
            <EntityConstructor />
          </RequireAuth>
        }
      />
    </Routes>
  )
}
