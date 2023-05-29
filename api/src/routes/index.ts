import { Router } from 'express'
import { authRoute } from './public/route.auth.js'
import { registrationRoute } from './public/route.registration.js'
import { projectRoute } from './auth/route.project.js'

const publicRouter = Router()

publicRouter.use(authRoute)
publicRouter.use(registrationRoute)
publicRouter.use('/project', projectRoute)

export default publicRouter
