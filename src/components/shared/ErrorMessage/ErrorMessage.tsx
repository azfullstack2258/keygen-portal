import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="mt-6 text-center text-sm text-red-500">
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
