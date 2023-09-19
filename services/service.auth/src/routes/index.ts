import { Router } from 'express'
import { authRoute } from './route.authorization'
import { refreshRoute } from './route.refresh'

const router = Router()

router.use(authRoute)
router.use('/refresh', refreshRoute)

export default router  
