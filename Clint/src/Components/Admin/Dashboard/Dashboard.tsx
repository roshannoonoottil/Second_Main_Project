
import { useNavigate } from 'react-router-dom';
import Sidebar from "../AdminComponts/Sidebar";
import Header from "../AdminComponts/Header";
import { Outlet } from "react-router-dom";
// import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { adminLogout } from '../../../Redux/authSlice';

function Dashboard() {
  const navigate = useNavigate();
  // const dispatch = useDispatch()

const token = localStorage.getItem('admintoken')

useEffect(()=>{
  if(!token){
    navigate('/admin')
   
    return
  }
})

  return (
    // <div>
    //   <h1>Admin Dashboard !</h1>
    //   <button onClick={(()=>{
    //         dispatch(adminLogout())
    //         localStorage.removeItem('admintoken')
    //       })}>logout</button>
    // </div>
<div className="flex h-screen w-screen bg-gray-900 text-white">
  <Sidebar />
  <div className="flex-1 flex flex-col overflow-hidden">
    <Header />
    <main className="flex-1 overflow-auto p-6 bg-gray-900">
      <Outlet />
    </main>
  </div>
</div>
  )
}

export default Dashboard
