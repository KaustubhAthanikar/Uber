import React, { use, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const UserLogin = () => {

    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');
    const {userData,setUserData} = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData({
            email:email,
            password:password
        })
        console.log(userData);
        setEmail('');
        setPassword('');
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <form onSubmit={(e)=>{
            handleSubmit(e);
        }}>
            <h3 className='text-lg font-medium mb-2'>Enter your email</h3>
            <input 
            className='bg-[#eeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'
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
            <p className='text center'>Don't have an account? <Link to="/signup" className='text-blue-500'>Sign up</Link></p>
        </form>
        </div>
            <Link to="/captain-login" className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
        <div>
            
        </div>
      
    </div>
  )
}

export default UserLogin
