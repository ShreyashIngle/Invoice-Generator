import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../store/slices/authSlice';
import { Logo } from '../components/Logo';
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import main from '../assets/main.png';


export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(email)).unwrap();
      toast.success('Reset password link has been sent to your email');
    } catch (error) {
      toast.error('Failed to send reset password link');
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
            <h2 className="text-4xl font-bold text-white mb-4">Forgot Password</h2>
            <p className="text-gray-400 mb-8">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C] focus:ring-1 focus:ring-[#B6F09C]"
                  placeholder="Enter Email ID"
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2A2A2A] text-[#B6F09C] rounded hover:bg-[#3A3A3A] transition-colors"
                >
                  Send Reset Link
                </button>
                <a href="/login" className="text-gray-400 hover:text-white">
                  Back to login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Background Ellipse Shapes (optional, similar to login page) */}
      <div className="absolute w-[200.18px] h-[200.89px] left-[-64.6px] bottom-[-50px] bg-[#CCF575] filter z-5 blur-[150px]"></div>
      <div className="absolute w-[300px] h-[180px] left-[1289.13px] top-[150px] bg-[#4F59A8] filter blur-[170px] transform rotate-[-90deg] z-0"></div>
    </div>
  );
};
