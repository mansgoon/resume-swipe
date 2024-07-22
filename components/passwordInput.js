import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const PasswordInput = ({ id, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 pr-10 bg-[#333] border border-[#555] rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-text"
        required
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-text focus:outline-none"
      >
        {showPassword ? (
          <EyeOffIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;