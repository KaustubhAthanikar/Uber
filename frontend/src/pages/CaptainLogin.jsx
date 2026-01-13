import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {CaptainDataContext} from '../context/captainContext'

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [captainData,setCaptainData] = useState('');

        const {captain, setCaptain} = React.useContext(CaptainDataContext);
        const navigate = useNavigate();
        const handleSubmit = async (e) => {
            e.preventDefault();
            const Captain = {
                email:email,
                password:password
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, Captain);

            if (response.status === 200) {
                const data = response.data;
                setCaptain(data.captain);   
                localStorage.setItem('token', data.token);
                navigate('/captain-home');
            }
            setEmail('');
            setPassword('');
        }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 ' src="https://pngimg.com/d/uber_PNG24.png" />
        <form onSubmit={(e)=>{
            handleSubmit(e);
        }}>
            <h3 className='text-lg font-medium mb-2'>Enter your email</h3>
            <input 
            className='bg-[#eeee] mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            required
            type='email' 
            placeholder='email@example.com'
            />
            <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
            <input 
            className='bg-[#eeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base' 
            required 
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            type='password' 
            placeholder='password'/>
            <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
            <p className='text center'>Don't have an account? <Link to="/captain-signup" className='text-blue-500'>Captain Sign up</Link></p>
        </form>
        </div>
            <Link to="/login" className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
        <div>
            
        </div>
      
    </div>
  )
}

export default CaptainLogin
