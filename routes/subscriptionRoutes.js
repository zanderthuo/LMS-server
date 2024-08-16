import { Router } from 'express'
import { authorizedRole, isLoggedIn } from '../middleware/authMiddleware.js'
import { unsubscribe, updateSubscription } from '../controller/subscriptionController.js'

const router = Router()

router.post('/subscribe', isLoggedIn, updateSubscription)
router.post('/unsubscribe', isLoggedIn, unsubscribe)


export default router
