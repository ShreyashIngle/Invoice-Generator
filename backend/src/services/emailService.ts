import nodemailer from 'nodemailer';

export const sendResetEmail = async (email: string, resetLink: string) => {
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
    subject: 'Password Reset Request',
    html: `<p>You requested to reset your password. Click the link below to reset it:</p>
           <a href="${resetLink}">Reset Password</a>`,
  };
  
  return transporter.sendMail(mailOptions);
};
