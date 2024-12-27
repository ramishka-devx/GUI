import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/authServices';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      alert(response.data.message);
      console.log('Token:', response.data.token); // Store the token as needed
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Identifier */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email, Phone, or Register Number</label>
            <input
              type="text"
              {...register('identifier', { required: 'Identifier is required' })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
