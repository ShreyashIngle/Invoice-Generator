import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/forgotPasswordController';
import { validateForgotPassword, validateResetPassword } from '../middleware/validate';

const router = express.Router();

router.post('/forgot', validateForgotPassword, forgotPassword);
router.post('/reset/:token', validateResetPassword, resetPassword);

export default router;
