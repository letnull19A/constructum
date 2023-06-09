import { Routes, Route, Navigate } from 'react-router-dom'
import { useUserContext } from '../hooks/hook.user-context'
import { LayoutFlat } from '../layouts/layout.flat'
import { Footer, Header } from '../components'
import { Login, Registration } from '../pages'

export const RequirePublic = ({ children }: { children: JSX.Element }) => {
  const auth = useUserContext()

  console.log(auth.user === null && auth.isAuthenticated === false)

  if (auth.user === null && auth.isAuthenticated === true) {
    return <Navigate to="/main" />
  }

  return children
}

export const PublicRouting = () => {
  return (
    <Routes>
      {['/', '/main'].map((path, index) => (
        <Route
          key={index}
          path={path}
          element={<LayoutFlat header={<Header />} content={<p>main page</p>} footer={<Footer />} />}
        />
      ))}
      <Route
        path="/login"
        element={
          <RequirePublic>
            <Login />
          </RequirePublic>
        }
      />
      <Route
        path="/registration"
        element={
          <RequirePublic>
            <Registration />
          </RequirePublic>
        }
      />
    </Routes>
  )
}
