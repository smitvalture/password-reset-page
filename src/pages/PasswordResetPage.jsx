import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://omxcoxoxfwiguhchvgih.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teGNveG94ZndpZ3VoY2h2Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3MjQwODgsImV4cCI6MTk5OTMwMDA4OH0.jan8HVIbvKmZBPSSsl9O9cWkYO7PdWSTacf9KhT1_78'
);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        const { user, error } = await supabase.auth.updateUser({
          password: password,
        });

        if (error) {
          // Handle error
          console.error('Password reset error:', error.message);
        } else {
          // Password reset successful
          console.log('Password reset successful');

          // Reset form fields
          setPassword('');
          setConfirmPassword('');
        }
      } catch (error) {
        // Handle error
        console.error('Password reset error:', error.message);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    setError((prevError) => ({
      ...prevError,
      password: '',
      confirmPassword: '',
    }));

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (password.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        password: 'Please enter a password',
      }));
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setError((prevError) => ({
        ...prevError,
        password: 'Password must contain at least 8 characters, one letter, and one number',
      }));
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        confirmPassword: 'Please confirm your password',
      }));
      isValid = false;
    } else if (password !== confirmPassword) {
      setError((prevError) => ({
        ...prevError,
        confirmPassword: 'Passwords do not match',
      }));
      isValid = false;
    }

    return isValid;
  };


  return (
    <div className="flex justify-center items-center h-screen bg-yellow-200">
      <div className="bg-white w-96 p-8 rounded shadow-lg">
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
              disabled={Object.values(error).some((value) => value !== '')}
              className="bg-yellow-500 disabled:bg-yellow-100 disabled:text-gray-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
