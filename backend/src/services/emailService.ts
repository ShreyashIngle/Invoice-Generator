//working
// import nodemailer from 'nodemailer';

// export const sendResetEmail = async (email: string, resetLink: string) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Password Reset Request',
//     html: `<p>You requested to reset your password. Click the link below to reset it:</p>
//            <a href="${resetLink}">Reset Password</a>`,
//   };
  
//   return transporter.sendMail(mailOptions);
// };



import nodemailer from 'nodemailer';

export const sendOTPEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset OTP',
    html: `
      <h1>Password Reset</h1>
      <p>Your OTP for password reset is: <strong>${otp}</strong></p>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };
  
  return transporter.sendMail(mailOptions);
};
