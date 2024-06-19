import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slices/user';
import { Button, Input } from '../../components/shared';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const creds = btoa(`${email}:${password}`);
      const res = await fetch('https://api.keygen.sh/v1/accounts/demo/tokens', {
        method: 'POST',
        headers: {
          authorization: `Basic ${creds}`,
          accept: 'application/json',
        },
      });

      const { data, errors } = await res.json();
      if (errors) {
        setError(errors[0].detail);
      } else {
        const token = data.attributes.token;
        dispatch(setToken(token));
        window.location.href = '/';
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="bg-dark p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-4 text-secondary">Sign in</h1>
        {error && <p className="text-red-500">{error}</p>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} text="Sign in" />
      </div>
    </div>
  );
};

export default Login;
