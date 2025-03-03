import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes"
import { Suspense } from "react";
import AdminLogin from "../Components/Admin/Login/Adminlogin";
import Dashboard from "../Components/Admin/Dashboard/Dashboard";

function AppRoutes() {
  return (
    <Suspense fallback={<div style={{ color: 'red' }}>Loading...</div>}>
        <Routes>

        <Route path="/admin" element={<AdminLogin />} />

        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>


        </Routes>
    </Suspense>
  )
}

export default AppRoutes
