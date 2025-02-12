import React from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin Login Clicked'); // Replace with actual admin authentication logic
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleAdminLogin}>
        <input type="email" placeholder="Admin Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="admin-login-button">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
