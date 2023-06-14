import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Login, Registration } from '../pages'
import { Main } from '../pages/page.main/Main'

export const RequirePublic = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()

  let element = children

  console.log(localStorage.getItem('token') !== null)

  if (localStorage.getItem('token') !== null) {
    element = <Navigate to="/main" state={{ from: location }} replace />
  }

  return element
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
