import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Logo } from './Logo';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden"> {/* Added overflow-hidden */}
      <header className="px-6 py-2 bg-[#1F1F1F] flex justify-between items-center"> {/* Match Register header */}
      <Logo />
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-[#B6F09C] text-black rounded hover:bg-[#a5e08b] transition-colors"
      >
        Logout
      </button>
    </header>
    </div>
  );
};