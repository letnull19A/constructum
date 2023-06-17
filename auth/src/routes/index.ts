import { Router } from 'express'
import { authRoute } from './route.auth'

export const router = Router()

router.use(authRoute)
