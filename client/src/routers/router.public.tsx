import { Routes, Route, Navigate } from 'react-router-dom'
import { useUserContext } from '../hooks/hook.user-context'
import { Login, Registration } from '../pages'
import { Main } from '../pages/page.main/Main'

export const RequirePublic = ({ children }: { children: JSX.Element }) => {
  const auth = useUserContext()

  console.log(auth.user === null || (auth.user === '' && auth.isAuthenticated === false))

  if (auth.user !== null && auth.isAuthenticated === true) {
    return <Navigate to="/main" />
  }

  return children
}

export const PublicRouting = () => {
  return (
    <Routes>
      {['/', '/main'].map((path, index) => (
        <Route key={index} path={path} element={<Main />} />
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
