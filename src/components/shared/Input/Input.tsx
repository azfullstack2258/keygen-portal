import React, { forwardRef } from 'react';

interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  name,
  type = 'text',
  autoComplete,
  required,
  placeholder,
  value,
  onChange,
  label,
}, ref) => (
  <div className="mt-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-400">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-800 text-white"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={ref}
    />
  </div>
));

Input.displayName = 'Input';

export default Input;
