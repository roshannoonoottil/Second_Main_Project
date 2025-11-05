import { Navigate, Outlet } from 'react-router-dom';

function AdminPrivateRoutes() {

    const token = localStorage.getItem('admintoken')

  return token ?    <Outlet/> : <Navigate to={'/admin'}/>
}

export default AdminPrivateRoutes;
