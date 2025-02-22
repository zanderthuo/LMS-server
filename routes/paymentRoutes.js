import { Router } from 'express'
import { allPayments, buySubscription, cancelSubscription, createMpesaCharge, getRazorpayKey, handleMpesaWebhook, verifySubscription } from '../controller/paymentController.js'
import { authorizedRole, isLoggedIn } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', isLoggedIn, authorizedRole('ADMIN'), allPayments)
router.get('/key', isLoggedIn, getRazorpayKey)
router.post('/subscribe', isLoggedIn, buySubscription)
router.post('/verify', isLoggedIn, verifySubscription)
router.post('/unsubscribe', isLoggedIn, cancelSubscription)
router.post('/mpesa/create-charge', isLoggedIn, createMpesaCharge)
// Webhook for M-Pesa notifications
router.post('/mpesa/webhook', handleMpesaWebhook)


export default router
