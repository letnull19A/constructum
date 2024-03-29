import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Header, Menu, Footer, Canvas, Content } from '../components'
import { LayoutDefault } from '../layouts/layout.default'
import { Projects } from '../pages/page.projects/Projects'
import { AddProject } from '../pages/page.add-project/AddProject'
import { Account, AddEntity, BuildedProject, EntityConstructor, ViewProject } from '../pages'
import { BuildSelect } from '../pages/page.build-select/BuildSelect'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()

  let element = children

  const localStorageContent = localStorage.getItem('token')

  if (localStorageContent === null || localStorageContent === '{}') {
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
      <Route
        path="project/:id/build/:syntax"
        element={
          <RequireAuth>
              <BuildedProject />
          </RequireAuth>
        }
      />
      <Route 
        path='project/:id/build'
        element={
          <RequireAuth>
            <BuildSelect/>
          </RequireAuth>
        }
      />
    </Routes>
  )
}
