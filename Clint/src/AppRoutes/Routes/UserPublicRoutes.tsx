import { Navigate, Outlet } from 'react-router-dom';

function UserPublicRoutes() {
  const token = localStorage.getItem('token')

  return token ? <Navigate to={'/home'}/> :  <Outlet />
}

export default UserPublicRoutes
