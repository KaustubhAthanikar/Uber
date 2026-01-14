import React,{Children, useEffect,useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'
import axios from 'axios';

const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserDataContext);
    
    const [isLoading,setIsLoading]=useState(true);
    useEffect(()=>{
        if(!token)
        navigate('/login');
    
    },[token]);
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{   
        if(response.status===200){
            setUser(response.data.user);
            setIsLoading(false);
        }
      }).catch(err=>{
        console.log(err);
        localStorage.removeItem('token');
        navigate('/login');
    });

    if(isLoading){
        return <div>Loading...</div>
    }
  return (
    <>
      {children};
    </>
  )
}

export default UserProtectWrapper
