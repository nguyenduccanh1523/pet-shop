import express from 'express'
import * as authController from '../controllers/auth.js'
// import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/refresh', authController.refreshToken)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);

export default router