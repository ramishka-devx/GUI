import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../api/authServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setIsLoggedIn}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        const response = await loginUser(data);
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);

        if (response?.data?.type === 'admin') {
            localStorage.setItem("canteenId", response.data.canteenId);
            navigate("/admin");
        }else{
          navigate("/");
        }

    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        toast.error(errorMessage);
        console.error('Error:', errorMessage);
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" p-8 shadow-lg rounded-lg max-w-md w-full bg-myBgWhite bg-opacity-10">
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
