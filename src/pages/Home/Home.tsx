import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { fetchUser } from '../../store/slices/user';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state: RootState) => state.user.token);
  const profile = useAppSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser()).unwrap().catch((error: any) => {
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
    <PageLayout>
      <h1 className="text-2xl text-secondary">Hello, {profile.firstName}!</h1>
    </PageLayout>
  );
};

export default Home;
