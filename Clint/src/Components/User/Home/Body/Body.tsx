import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../../../../Redux/authSlice';

function Body() {
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

    <Header/>
    <div><h1>Home Page</h1></div>
    <button onClick={(()=>{
      dispatch(logout())
    })}>logout</button>
    <Footer/>

    </div>
  )
}

export default Body
