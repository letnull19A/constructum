import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Header, Menu, Footer, Canvas } from '../components'
import { LayoutDefault } from '../layouts/layout.default'
import { useUserContext } from '../hooks/hook.user-context'
import { Project } from '../components/component.project/Project'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useUserContext()
  const location = useLocation()

  console.log(auth)

  if (auth.user === null && auth.isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export const AuthRouting = () => {
  return (
    <RequireAuth>
      <Routes>
        <Route
          path="/project"
          element={<LayoutDefault header={<Header />} menu={<Menu />} content={<p>Projects</p>} footer={<Footer />} />}
        />
        <Route
          path="/scheme"
          element={<LayoutDefault header={<Header />} menu={<Menu />} content={<Canvas />} footer={<Footer />} />}
        />
        <Route
          path="/account"
          element={<LayoutDefault header={<Header />} menu={<Menu />} content={<p>Account</p>} footer={<Footer />} />}
        />
        <Route
          path="/project/:id"
          element={<LayoutDefault header={<Header />} menu={<Menu />} content={<Project />} footer={<Footer />} />}
        />
      </Routes>
    </RequireAuth>
  )
}