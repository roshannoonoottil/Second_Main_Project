
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './Dashboard.css'
import { adminLogout } from '../../../Redux/authSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

const token = localStorage.getItem('admintoken')

useEffect(()=>{
  if(!token){
    navigate('/admin')
   
    return
  }
})

  return (
    <div>
      <h1>Admin Dashboard !</h1>
      <button onClick={(()=>{
            dispatch(adminLogout())
            localStorage.removeItem('admintoken')
          })}>logout</button>
    </div>
  )
}

export default Dashboard
