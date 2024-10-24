//working
// import { Request, Response } from 'express';
// import  {User}  from '../models/User';
// import crypto from 'crypto';
// import { sendResetEmail } from '../services/emailService'; // Add this for sending emails
// import bcrypt from 'bcryptjs';
// export const forgotPassword = async (req: Request, res: Response) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Generate token
//     const token = crypto.randomBytes(20).toString('hex');
//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiry

//     await user.save();

//     // Send email with reset link
//     const resetLink = `http://localhost:5173/reset/${token}`;

//     await sendResetEmail(user.email, resetLink);

//     res.status(200).json({ message: 'Reset password email sent' });
//   } catch (err) {
//     console.error(err); // Log the error
//     const errorMessage = (err instanceof Error) ? err.message : 'Unknown error';
//     res.status(500).json({ message: 'Error sending reset password email', error: errorMessage });
//   }
// };

// export const resetPassword = async (req: Request, res: Response) => {
//   const token = req.params.token; // Use req.params to get the token from URL
//   const { password, confirmPassword } = req.body;

//   // Token check
//   if (!token) {
//     return res.status(400).json({ message: 'Token is required' });
//   }

//   // Check if passwords match
//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({ message: 'Password has been reset successfully' });
//   } catch (err) {
//     console.error(err);
//     const errorMessage = (err instanceof Error) ? err.message : 'Unknown error';
//     res.status(500).json({ message: 'Error resetting password', error: errorMessage });
//   }
// };


// 2. Update Password Reset Controller (passwordController.ts)
import { Request, Response } from 'express';
import  User  from '../models/User';
import bcrypt from 'bcryptjs';
import { sendOTPEmail } from '../services/emailService';

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Save OTP to user document
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        resetOTP: otp,
        resetOTPExpires: new Date(Date.now() + 600000) // 10 minutes expiry
      }
    );

    // Send OTP email
    await sendOTPEmail(user.email, otp);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error(err);
    const errorMessage = (err instanceof Error) ? err.message : 'Unknown error';
    res.status(500).json({ message: 'Error sending OTP', error: errorMessage });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetOTP: otp,
      resetOTPExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, password } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetOTP: otp,
      resetOTPExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear OTP
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        password: hashedPassword,
        resetOTP: undefined,
        resetOTPExpires: undefined
      }
    );

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error resetting password' });
  }
};