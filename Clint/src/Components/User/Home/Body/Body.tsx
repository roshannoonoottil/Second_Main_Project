import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../../../../Redux/authSlice';

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

// interface AuthState {
//   isAuthenticated: boolean; // true or false
//   isAdmin: boolean; // true or false

// }


// const isAuth = useSelector((state: { auth: AuthState }) => state.auth.isAuthenticated);
const token = localStorage.getItem('token')

useEffect(()=>{
  if(!token){
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
      localStorage.removeItem('token')
    })}>logout</button>
    <Footer/>

    </div>
  )
}

export default Body
