import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const SignUp = lazy(() => import('./Components/User/SignUp/SignUp'));
const Login = lazy(() => import('./Components/User/Login/Login'));
const AdminLogin = lazy(() => import('./Components/Admin/Login/Adminlogin'));
const TestComponent = lazy(() => import('./Components/TestComponent'));
const Home = lazy(() => import('./Components/User/Home/Body/Body'));
const Dashboard = lazy(() => import('./Components/Admin/Dashboard/Dashboard'));
const CompleteProfile = lazy(() => import('./Components/User/CompletProfile/CompleteProfile'));
const CreatePost = lazy(() => import('./Components/User/Post/CreatePost'));
const AdminLayout = lazy(() => import('./Components/Admin/AdminLayout'));


function App() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: "url('/bg-img.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} 
    >
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
            <Route path='/complete-profile' element={<CompleteProfile />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/test' element={<TestComponent />} />
            <Route path='/create' element={<CreatePost />} />

            {/* Admin Protected Routes */}
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              {/* Add more nested admin routes here if needed */}
            </Route>

          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
