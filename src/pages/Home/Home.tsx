import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { fetchUser, logout } from '../../store/slices/user';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state: RootState) => state.user.token);
  const profile = useAppSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser()).unwrap().catch((error: any) => {
        console.error('Failed to fetch user:', error);
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, token]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <h1 className="text-2xl text-secondary">Hello, {profile.firstName}!</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Home;
