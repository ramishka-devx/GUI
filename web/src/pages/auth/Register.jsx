import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../api/authServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.css';
import Logo from '../../comp/logo/Logo';


const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      toast.success(response.data.message || 'User registered successfully');
      navigate('/login');
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.message ||
        'Something went wrong';
      toast.error(errorMessage);
      console.error('Error:', errorMessage);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        {/* <img src={Logo} alt="A/L Guidance Logo" className="logo" /> */}
        <Logo fontSize = "5"/>
        <h1 className="welcome-title">Welcome to Cafeteria Managment System</h1>
        <p className="welcome-subtitle">
        Fuel your day with delicious and affordable meals crafted for students. Enjoy a variety of fresh options that make every break a satisfying experience!
        </p>
      </div>

      <div className="register-card">
        <h2 className="register-title">Register Now</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          {/* First Name */}
          <div className="form-group">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className="form-input"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className="form-input"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="form-input"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="form-input"
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          {/* Register Number */}
          <div className="form-group">
            <label className="form-label">Register Number:</label>
            <input
              type="text"
              {...register('registerNumber', {
                required: 'Register number is required',
              })}
              className="form-input"
              placeholder="Enter your register number"
            />
            {errors.registerNumber && (
              <p className="error-message">{errors.registerNumber.message}</p>
            )}
          </div>

          {/* Batch */}
          <div className="form-group">
            <label className="form-label">Batch:</label>
            <select
              {...register('batch', { required: 'Batch is required' })}
              className="form-input"
            >
              <option value="">Select Batch</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
            </select>
            {errors.batch && (
              <p className="error-message">{errors.batch.message}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
