import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const SignUp = lazy(() => import('./Components/User/SignUp/SignUp'));
const Login = lazy(() => import('./Components/User/Login/Login'));
const AdminLogin = lazy(() => import('./Components/Admin/Login/Adminlogin'));
const TestComponent = lazy(() => import('./Components/TestComponent'));
const Home = lazy(() => import('./Components/User/Home/Home'));
const Dashboard = lazy(() => import('./Components/Admin/Dashboard/Dashboard'));
const CompleteProfile = lazy(() => import('./Components/User/CompletProfile/CompleteProfile'));
// const CreatePost = lazy(() => import('./Components/User/Post/CreatePost'));
const AdminLayout = lazy(() => import('./Components/Admin/AdminLayout'));


function App() {
 return (
  <div className="relative min-h-screen w-full m-0 p-0 
    bg-[url('/bg-img.png')] bg-cover bg-center 
    font-newspaper text-[17px] leading-relaxed text-gray-800">
    {/* Shadow Overlay */}
    <div 
    className="absolute inset-0 bg-black/70 z-10"
     />

    {/* App Content on top of shadow */}
    <div 
    className="relative z-20 flex justify-center items-center"
    >
      <Router>
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
            <Route path='/complete-profile' element={<CompleteProfile />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/test' element={<TestComponent />} />
            {/* <Route path='/create' element={<CreatePost />} /> */}

            {/* Admin Protected Routes */}
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  </div>
);

}

export default App;
