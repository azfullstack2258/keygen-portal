import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../store/slices/user';
import { useAppDispatch } from '../store';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/licenses">Licenses</Link>
          </li>
        </ul>
      </nav>
      <button className="text-white hover:text-gray" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
