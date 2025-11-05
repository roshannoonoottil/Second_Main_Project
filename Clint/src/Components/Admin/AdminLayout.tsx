import Sidebar from './AdminComponents/Sidebar';
import Header from './AdminComponents/Header';
import Dashboard from './Dashboard/Dashboard';

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 overflow-y-auto flex-1">
          <Dashboard/>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
