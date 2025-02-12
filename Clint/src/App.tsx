import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const SignUp = lazy(() => import('./Components/User/SignUp/SignUp'));
const Login = lazy(() => import('./Components/User/Login/Login'));
const AdminLogin = lazy(() => import('./Components/Admin/Login/Adminlogin'));

function App() {
  const [shadowStyle, setShadowStyle] = useState({
    left: '50%',
    top: '50%',
  });

  const handleMouseMove = (e:MouseEvent) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const xPercent = (clientX / windowWidth) * 100;
    const yPercent = (clientY / windowHeight) * 100;

    setShadowStyle({
      left: `${xPercent}%`,
      top: `${yPercent}%`,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: "url('/pexels-italo-melo-248867-2378959.jpg')", // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Shadow effect layer (applies on top of everything) */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // Allows interaction with other components
          background: `radial-gradient(circle at ${shadowStyle.left} ${shadowStyle.top}, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.6) 70%)`,
          backdropFilter: 'blur(1px)', // Adds slight blur for a natural effect
          transition: 'background 0.2s ease-out',
          zIndex: 1, // Places it above the background but below the content
        }}
      ></div>

      {/* Main Content (UI Components) */}
      <div
        style={{
          position: 'relative',
          zIndex: 2, // Ensures the UI stays above the shadow effect
          width: '100%',
          height: '100%', // Added to make sure this container fills the parent's height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Router>
          <Suspense fallback={<div style={{ color: 'red' }}>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/admin' element={<AdminLogin />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </div>
  );
}

export default App;
