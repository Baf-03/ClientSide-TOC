import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isVerified,setLoading } from '../state/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthRoute = () => {
  const navigate= useNavigate()
  const dispatch =useDispatch()
  const {loading,verified}=useSelector((state)=>state.userReducer)
  const pageNav =()=>{
    console.log(isVerified)
    if(isVerified){
      dispatch(setLoading(true))
      console.log("mae chala")
      // navigate("/")
    }
  }
  try{
    
    useEffect(()=>{
      dispatch(setLoading(true))
      const token =localStorage.getItem("token");
      if(token){
        const verifyUser =async()=>{
          const resp = await axios.get(`${apiUrl}/api/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("err",resp)
        }
        dispatch(setLoading(false));
        dispatch(isVerified(true));
        verifyUser()
        pageNav()
        
       
      }
      dispatch(isVerified(false));
      dispatch(setLoading(false))
    },[])

  }catch(err){
    dispatch(isVerified(false));
    dispatch(setLoading(false))
  }
 
  return loading?(<div className='loader'></div>):(verified?("already logged in"):<Outlet/>)
}

export default AuthRoute