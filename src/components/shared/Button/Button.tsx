import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      className="w-full p-2 bg-primary text-white rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
