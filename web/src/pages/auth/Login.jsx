import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/authServices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // Import the new CSS file
import Logo from "../../comp/logo/Logo";

const Login = ({ setIsLoggedIn, setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);

      setUser({
        name : response.data.Name || "guest",
        email : response.data.email || " ",
        isAdmin : response.data.type == "admin" ? true : false
      })

      if (response?.data?.type === "admin") {
        localStorage.setItem("canteenId", response.data.canteenId);
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Error:", errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        {/* <img src={Logo} alt="A/L Guidance Logo" className="logo" /> */}
        <Logo fontSize="5" />
        <h1 className="welcome-title">Welcome to Cafeteria Managment System</h1>
        <p className="welcome-subtitle">
          Fuel your day with delicious and affordable meals crafted for
          students. Enjoy a variety of fresh options that make every break a
          satisfying experience!
        </p>
      </div>

      <div className="login-card">
        <h2 className="login-title">Log in</h2>
        <p className="login-subtitle">
          Need an account?{" "}
          <Link to="/register" className="link">
            Create an account
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* Identifier */}
          <div className="form-group">
            <label className="form-label">Username or Email</label>
            <input
              type="text"
              {...register("identifier", {
                required: "Identifier is required",
              })}
              className="form-input"
              placeholder="Enter your username or email"
            />
            {errors.identifier && (
              <p className="error-message">{errors.identifier.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group password-group">
            <label className="form-label">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="form-input"
                placeholder="Enter your password"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
