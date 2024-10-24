import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../store/slices/authSlice';
import { Logo } from '../components/Logo';
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import main from "../assets/main.png";

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams<{ token: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!token) {
      toast.error('Invalid reset link');
      return;
    }

    try {
      await dispatch(resetPassword({ 
        token, 
        password, 
        confirmPassword 
      })).unwrap();
      toast.success('Password has been reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
      {/* Header Section */}
      <header className="px-6 py-2 bg-[#1F1F1F] flex justify-between items-center">
        <Logo />
        <div className="px-6 py-2 bg-[#2A2A2A] text-[#B6F09C] rounded-md border border-[#B6F09C]/20 text-sm">
          Connecting People With Technology
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Left Image Section (Hidden on smaller screens) */}
        <div className="w-1/2 hidden lg:flex justify-center items-center relative">
          <img
            src={main} // Using the same main image as the Login component
            alt="Main visual"
            className="mt-9 w-[370px] h-[630px] bg-[#2F2F2F] rounded-[70px] object-cover z-10"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-12 mt-20 z-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Reset Password</h2>
            <p className="text-gray-400 mb-8">Enter your new password below.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Input */}
              <div>
                <label className="block text-white mb-2">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
                  placeholder="Enter new password"
                  required
                />
              </div>

              {/* Confirm Password Input */}
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

              {/* Submit Button */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2A2A2A] text-[#B6F09C] rounded hover:bg-[#3A3A3A] transition-colors"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Background Ellipse Shapes */}
      <div className="absolute w-[200.18px] h-[200.89px] left-[-64.6px] bottom-[-50px] bg-[#CCF575] filter z-5 blur-[150px]"></div>
      <div className="absolute w-[300px] h-[180px] left-[1289.13px] top-[150px] bg-[#4F59A8] filter blur-[170px] transform rotate-[-90deg] z-0"></div>
    </div>
  );
};
