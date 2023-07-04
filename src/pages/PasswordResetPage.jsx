import React, { useState } from 'react';

const PasswordResetPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    password: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError((prevState) => ({
      ...prevState,
      password: '',
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setError((prevState) => ({
      ...prevState,
      confirmPassword: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset form fields
    setPassword('');
    setConfirmPassword('');
  };

  const validateForm = () => {
    let isValid = true;
    const newError = {
      password: '',
      confirmPassword: '',
    };

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // Password must contain at least 8 characters, one letter, and one number

    if (password.trim() === '') {
      newError.password = 'Please enter a password';
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      newError.password = 'Password must contain at least 8 characters, one letter, and one number';
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      newError.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newError.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-yellow-200">
      <div className="bg-white w-1/5 p-8 rounded shadow-lg">
        <h2 className="text-2xl text-center mb-4">Password Reset</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-3 py-2 border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-yellow-500`}
              required
            />
            {error.password && <p className="text-red-500">{error.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full px-3 py-2 border ${error.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-yellow-500`}
              required
            />
            {error.confirmPassword && <p className="text-red-500">{error.confirmPassword}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={validateForm}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetPage;
