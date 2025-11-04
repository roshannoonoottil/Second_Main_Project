import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './AdminComponents/Sidebar';
import Header from './AdminComponents/Header';

const AdminLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('admintoken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
    }
  }, [navigate, token]);

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
