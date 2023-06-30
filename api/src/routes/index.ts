import { Router } from 'express'
import { authRoute } from './public/route.auth.js'
import { registrationRoute } from './public/route.registration.js'
import { projectRoute } from './auth/route.project.js'
import { logoutRoute } from './auth/route.logout.js'
import { isAuth } from '../middlewares/middleware.auth.js'
import { refreshRoute } from './auth/route.refresh.js'
import { userDataRoute } from './auth/route.user-data.js'
import { entityRoute } from './auth/route.entity.js'
import { isNotAuth } from '../middlewares/middleware.not-auth.js'

const router = Router()

router.use('/auth', isNotAuth, authRoute)
router.use('/registration', isNotAuth, registrationRoute)

/**
 * @todo Remove it
 */
router.use('/refresh', refreshRoute)

router.use('/logout', isAuth, logoutRoute)
router.use('/user', isAuth, userDataRoute)
router.use('/project', isAuth, projectRoute)
router.use('/project', isAuth, entityRoute)

export default router
