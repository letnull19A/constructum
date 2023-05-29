import { Router } from 'express'
import { authRoute } from './public/route.auth.js'
import { registrationRoute } from './public/route.registration.js'
import { projectRoute } from './auth/route.project.js'
import { logoutRoute } from './auth/route.logout.js'
import { isAuth } from '../middlewares/middleware.auth.js'

const publicRouter = Router()

publicRouter.use(authRoute)
publicRouter.use(registrationRoute)
publicRouter.use(logoutRoute)
publicRouter.use('/project', isAuth, projectRoute)

export default publicRouter
