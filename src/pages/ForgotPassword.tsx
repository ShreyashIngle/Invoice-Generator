import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword, resetPassword, verifyOTP } from '../store/slices/authSlice';
import { Logo } from '../components/Logo';
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import main from '../assets/main.png';
import { useNavigate } from 'react-router-dom';


export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(email)).unwrap();
      setOtpSent(true);
      toast.success('OTP sent to your email');
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(verifyOTP({ email, otp })).unwrap();
      setOtpVerified(true);
      toast.success('OTP verified successfully');
    } catch (error) {
      toast.error('Invalid OTP');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await dispatch(resetPassword({ email, otp, password: newPassword })).unwrap();
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
      <header className="px-6 py-2 bg-[#1F1F1F] flex justify-between items-center">
        <Logo />
        <div className="px-6 py-2 bg-[#2A2A2A] text-[#B6F09C] rounded-md border border-[#B6F09C]/20 text-sm">
          Connecting People With Technology
        </div>
      </header>

      <div className="flex">
        <div className="w-1/2 hidden lg:flex justify-center items-center relative">
          <img
            src={main}
            alt="Office"
            className="mt-9 w-[370px] h-[630px] bg-[#2F2F2F] rounded-[70px] object-cover z-10"
          />
        </div>
        <div className="w-1/2 p-12 mt-20 z-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Reset Password</h2>
            
            {!otpSent ? (
              // Step 1: Enter Email
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2A2A2A] text-[#B6F09C] rounded hover:bg-[#3A3A3A] transition-colors"
                >
                  Send OTP
                </button>
              </form>
            ) : !otpVerified ? (
              // Step 2: Enter OTP
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
                    placeholder="Enter OTP"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2A2A2A] text-[#B6F09C] rounded hover:bg-[#3A3A3A] transition-colors"
                >
                  Verify OTP
                </button>
              </form>
            ) : (
              // Step 3: Enter New Password
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2A2A2A] text-[#B6F09C] rounded hover:bg-[#3A3A3A] transition-colors"
                >
                  Reset Password
                </button>
              </form>
            )}
            
            <div className="mt-4">
              <a href="/login" className="text-gray-400 hover:text-white">
                Back to login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Ellipse Shapes (optional, similar to login page) */}
      <div className="absolute w-[200.18px] h-[200.89px] left-[-64.6px] bottom-[-50px] bg-[#CCF575] filter z-5 blur-[150px]"></div>
      <div className="absolute w-[300px] h-[180px] left-[1289.13px] top-[150px] bg-[#4F59A8] filter blur-[170px] transform rotate-[-90deg] z-0"></div>
    </div>
  );
};
