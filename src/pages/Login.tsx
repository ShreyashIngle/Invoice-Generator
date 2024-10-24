import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import { Logo } from '../components/Logo';
import { AppDispatch } from '../store';
import main from '../assets/main.png';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate('/products');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden"> {/* Added overflow-hidden */}
      <header className="px-6 py-2 bg-[#1F1F1F] flex justify-between items-center"> {/* Match Register header */}
        <Logo />
        <div className="px-6 py-2 bg-[#2A2A2A] text-[#B6F09C] rounded-md border border-[#B6F09C]/20 text-sm">
          Connecting People With Technology
        </div>
      </header>
      <div className="flex">
        <div className="w-1/2 hidden lg:flex justify-center items-center relative">
          <img
            src={main}
            alt="Main visual"
            className="mt-9 w-[370px] h-[630px] bg-[#2F2F2F] rounded-[70px] object-cover z-10" // Adjusted z-index
          />
        </div>
        <div className="w-1/2 p-12 mt-20 z-10"> {/* Match Register form container */}
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Let the Journey Begin!</h2>
            <p className="text-gray-400 mb-8">
              This is basic login page which is used for levitation assignment purpose.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
                  placeholder="Enter Email ID"
                  required
                />
                <p className="text-gray-400 text-sm mt-1">
                  This email will be displayed with your inquiry
                </p>
              </div>
              <div>
                <label className="block text-white mb-2">Current Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2A2A2A] text-[#B6F09C] rounded hover:bg-[#3A3A3A] transition-colors"
                >
                  Login now
                </button>
                <a href="#" className="text-gray-400 hover:text-white">
  <Link to="/forgot">Forget password?</Link>
</a>
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
