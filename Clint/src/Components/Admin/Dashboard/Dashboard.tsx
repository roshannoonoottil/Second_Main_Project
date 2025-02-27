
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Dashboard.css'
import { adminLogout } from '../../../Redux/authSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

interface AuthState {
  isAuthenticated: boolean; // true or false
  isAdmin: boolean; // true or false

}


const isAuth = useSelector((state: { auth: AuthState }) => state.auth.isAuthenticated);

useEffect(()=>{
  if(!isAuth){
    navigate('/')
    return
  }
})

  return (
    <div>
      <h1>Admin Dashboard !</h1>
      <button onClick={(()=>{
            dispatch(adminLogout())
          })}>logout</button>
    </div>
  )
}

export default Dashboard
