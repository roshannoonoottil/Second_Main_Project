
import { useNavigate } from 'react-router-dom';
import Sidebar from "../AdminComponts/Sidebar";
import Header from "../AdminComponts/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';

function Dashboard() {
  const navigate = useNavigate();

const token = localStorage.getItem('admintoken')

useEffect(()=>{
  if(!token){
    navigate('/admin')
   
    return
  }
})

  return (
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
