import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-lg font-bold">Auth App</h1>
            <div>
              <Link to="/login" className="px-4">
                Login
              </Link>
              <Link to="/register" className="px-4">
                Register
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
