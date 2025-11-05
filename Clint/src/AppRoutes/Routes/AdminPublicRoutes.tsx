import { Navigate, Outlet } from 'react-router-dom';

function AdminPublicRoutes() {

    const token = localStorage.getItem('admintoken')

  return token ?    <Navigate to={'/dashboard'}/> : <Outlet/>
}

export default AdminPublicRoutes;