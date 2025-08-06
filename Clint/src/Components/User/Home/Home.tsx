import Header from './Header/Header'
import Body from './Body/Body';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Home() {
 const navigate = useNavigate();
const token = localStorage.getItem('token')

useEffect(()=>{
  if(!token){
    navigate('/')
    
    return
  }
})


 return (
<div className="min-h-screen w-full">
      {/* Frosted Overlay */}
      <div className="min-h-screen w-full bg-white/0 backdrop-blur-sm flex flex-col pt-24">

        {/* Header */}
        <Header 
        // user={user} 
        />

        {/* Body */}
        <Body/>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Home
