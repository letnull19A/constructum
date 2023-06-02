import { Routes, Route } from 'react-router-dom'
import { useUserContext } from '../hooks/hook.user-context'
import { LayoutFlat } from '../layouts/layout.flat'
import { Footer, Header } from '../components'

export const PublicRouting = () => {
  const context = useUserContext()

  const routing = (
    <Routes>
      <Route path={'/'} element={<LayoutFlat header={<Header />} content={<p>main page</p>} footer={<Footer />} />} />
      <Route path="/main" element={<LayoutFlat header={<Header />} content={<p>main page</p>} footer={<Footer />} />} />
      <Route path="/login" element={<LayoutFlat header={<Header />} content={<p>Login</p>} footer={<Footer />} />} />
      <Route
        path="/registration"
        element={<LayoutFlat header={<Header />} content={<p>Registration</p>} footer={<Footer />} />}
      />
    </Routes>
  )

  return !context.isAuthenticated ? routing : null
}
