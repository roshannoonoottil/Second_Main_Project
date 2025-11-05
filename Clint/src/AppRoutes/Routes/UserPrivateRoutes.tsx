import { Navigate, Outlet } from 'react-router-dom';
function UserPrivateRoutes() {
  const token = localStorage.getItem('token')

  return token ? <Outlet /> : <Navigate to={'/'} />
}

export default UserPrivateRoutes
