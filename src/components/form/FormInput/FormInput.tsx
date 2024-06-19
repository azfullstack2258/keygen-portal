import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input } from '../../shared';

interface FormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  type,
  autoComplete,
  placeholder,
  required,
}) => (
  <Controller
    name={name}
    control={control}
    rules={{ required: required ? `${label} is required` : undefined }}
    render={({ field, fieldState: { error } }) => (
      <>
        <Input
          {...field}
          id={name}
          name={name}
          type={type}
          label={label}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          onChange={field.onChange}
          value={field.value}
          ref={field.ref}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
      </>
    )}
  />
);

export default FormInput;
