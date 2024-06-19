import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../store/slices/user';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { ErrorMessage, Button } from '../../components/shared';
import { FormInput} from '../../components/form';
import { loginSchema } from '../../utils/validationSchema';
import { GithubIcon, SSOIcon } from '../../components/icons';

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema)
  });
  const dispatch = useAppDispatch();
  const { token, error } = useAppSelector((state: RootState) => state.user);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="absolute top-0 left-0 m-4">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      </div>
      <div className="flex flex-col w-full max-w-md m-auto p-8 border border-gray-700 rounded-lg bg-gray-900">
        <div className="text-center mb-8">
          <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
        </div>
        <div>
          <Button type="button" className="bg-gray-800 hover:bg-gray-700 flex items-center justify-center gap-1">
            <GithubIcon />
            Continue with GitHub
          </Button>
          <Button type="button" className="mt-4 bg-gray-800 hover:bg-gray-700 flex items-center justify-center gap-1">
            <SSOIcon />
            Continue with SSO
          </Button>
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">or</span>
            </div>
          </div>
          <FormInput
            name="email"
            control={control}
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <FormInput
            name="password"
            control={control}
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />
          {error && <ErrorMessage message={error} />}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-green-500 hover:text-green-400">
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-green-600 hover:bg-green-500" onClick={handleSubmit(onSubmit)}>
              Sign In
            </Button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-green-500 hover:text-green-400">
              Sign Up Now
            </a>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 items-center justify-center">
        <div className="max-w-md text-center">
          <blockquote className="text-lg font-semibold text-gray-400">
            <p>
            "First, we'd like to thank our amazing customers who have kept us in business
since 2016. Without you, we wouldn't be working to make Keygen better."
            </p>
            <footer className="mt-4">
              <p className="text-gray-500">- Zeke Gabrielse</p>
              <p className="text-gray-500">@Keygen</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
