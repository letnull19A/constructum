import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Header, Menu, Footer, Canvas } from '../components'
import { LayoutDefault } from '../layouts/layout.default'
import { Projects } from '../pages/page.projects/Projects'
import { Project } from '../components/component.project/Project'
import { AddProject } from '../pages/page.add-project/AddProject'

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
        element={<LayoutDefault header={<Header />} menu={<Menu />} content={<Canvas />} footer={<Footer />} />}
      />
      <Route
        path="/account"
        element={
          <RequireAuth>
            <LayoutDefault header={<Header />} menu={<Menu />} content={<p>Account</p>} footer={<Footer />} />
          </RequireAuth>
        }
      />
      <Route
        path="/project/:id"
        element={
          <RequireAuth>
            <LayoutDefault header={<Header />} menu={<Menu />} content={<Project />} footer={<Footer />} />
          </RequireAuth>
        }
      />
    </Routes>
  )
}
