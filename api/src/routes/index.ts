import { Router } from 'express'
import { authRoute } from './public/route.auth.js'
import { registrationRoute } from './public/route.registration.js'
import { projectRoute } from './auth/route.project.js'
import { logoutRoute } from './auth/route.logout.js'
import { isAuth } from '../middlewares/middleware.auth.js'
import { refreshRoute } from './auth/route.refresh.js'

const router = Router()

router.use(authRoute)
router.use(registrationRoute)
router.use('/refresh', refreshRoute)
router.use(isAuth, logoutRoute)
router.use('/project', isAuth, projectRoute)

export default router
