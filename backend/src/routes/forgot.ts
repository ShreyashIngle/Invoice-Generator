//working
// import express from 'express';
// import { forgotPassword, resetPassword } from '../controllers/forgotPasswordController';
// import { validateForgotPassword, validateResetPassword } from '../middleware/validate';

// const router = express.Router();

// router.post('/forgot', validateForgotPassword, forgotPassword);
// router.post('/reset/:token', validateResetPassword, resetPassword);

// export default router;


import express from 'express';
import { forgotPassword, verifyOTP, resetPassword } from '../controllers/forgotPasswordController';

const router = express.Router();

router.post('/forgot', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset', resetPassword);

export default router;