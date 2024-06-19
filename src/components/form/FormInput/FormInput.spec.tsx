import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';

const renderWithFormProvider = (component: React.ReactNode) => {
  const methods = useForm();
  return render(<FormProvider {...methods}>{component}</FormProvider>);
};

test('renders FormInput component', () => {
  const { control } = useForm();
  renderWithFormProvider(
    <FormInput
      name="email"
      control={control}
      label="Email"
      type="email"
      placeholder="you@example.com"
      required
    />
  );

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
});

test('renders FormInput component with error message', () => {
  const methods = useForm({
    defaultValues: {
      email: '',
    },
  });
  methods.setError('email', {
    type: 'required',
    message: 'Email is required',
  });

  render(
    <FormProvider {...methods}>
      <FormInput
        name="email"
        control={methods.control}
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
      />
    </FormProvider>
  );

  expect(screen.getByText('Email is required')).toBeInTheDocument();
});
