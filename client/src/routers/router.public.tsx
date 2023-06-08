import { Routes, Route, Navigate } from 'react-router-dom'
import { useUserContext } from '../hooks/hook.user-context'
import { LayoutFlat } from '../layouts/layout.flat'
import { Footer, Header } from '../components'

export const RequirePublic = ({ children }: { children: JSX.Element }) => {
  const auth = useUserContext()

  console.log(auth.user === null && auth.isAuthenticated === false)

  if (auth.user === null && auth.isAuthenticated === false) {
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
            <LayoutFlat header={<Header />} content={<p>Login</p>} footer={<Footer />} />
          </RequirePublic>
        }
      />
      <Route
        path="/registration"
        element={
          <RequirePublic>
            <LayoutFlat header={<Header />} content={<p>Registration</p>} footer={<Footer />} />
          </RequirePublic>
        }
      />
    </Routes>
  )
}
