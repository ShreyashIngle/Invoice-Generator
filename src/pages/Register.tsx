import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../store/slices/authSlice';
import { Logo } from '../components/Logo';
import { AppDispatch } from '../store';
import main from '../assets/main.png';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden"> {/* Added overflow-hidden */}
    <header className="px-6 py-2 bg-[#1F1F1F]  flex justify-between items-center ">
      <Logo />
      <a 
        href="/login" 
        className="px-6 py-2 bg-[#B6F09C] text-black rounded hover:bg-[#a5e08b] transition-colors text-sm font-medium"
      >
        Login
      </a>
    </header>
      <div className="flex">
      <div className="w-1/2 hidden lg:flex justify-center items-center relative">
          <img
            src={main}
            alt="Main visual"
            className="mt-9 w-[370px] h-[630px] bg-[#2F2F2F] rounded-[70px] object-cover  z-10"
          />
        </div>
        <div className="w-1/2 p-12 mt-20 z-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Sign up to begin journey</h2>
           
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Enter your name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
                  placeholder="Enter Name"
                  required
                />
                
              </div>
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
                
              </div>
              <div>
                <label className="block text-white mb-2">Password</label>
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
                  Register
                </button>
                <a href="/login" className="text-gray-400 hover:text-white">
                  Already have account?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
       {/* Ellipse 5 */}
       
       <div className="absolute w-[200.18px] h-[200.89px] left-[-64.6px] bottom-[-50px] bg-[#CCF575] filter z-5 blur-[150px] z-[1]"></div>

      {/* Ellipse 7 */}
      <div className="absolute w-[300px] h-[180px] left-[1289.13px] top-[150px] bg-[#4F59A8] filter blur-[170px] transform rotate-[-90deg] z-[1]"></div>


    </div>
  );
};