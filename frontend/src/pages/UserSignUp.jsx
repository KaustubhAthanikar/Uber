import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/userContext'


const UserSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});

    const {user,setUser} = useContext(UserDataContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status === 201){

            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home');

        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }
    return (
        <div className='p-7 h-screen flex flex-col '>
            <div>
                <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
                <form onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                    <h3 className='text-lg font-medium mb-2'>Enter your full name</h3>
                    <div className='flex gap-2 mb-6'>
                        <input
                            className='bg-[#eeee] w-1/2 rounded px-4 py-2  text-lg placeholder:text-base'
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            required
                            type='text'
                            placeholder='first name'
                        />
                        <input
                            className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            required
                            type='text'
                            placeholder='last name'
                        />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>Enter your email</h3>
                    <input
                        className='bg-[#eeee] mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
                        value={email}
                        onChange={(e) => {
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
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type='password'
                        placeholder='password' />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign Up</button>
                    <p className='text center'>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
                </form>
            </div>
            <p className='text-[10px]'>By proceeding, you agree to the Terms of Service and Privacy Policy.</p>
            <div>

            </div>

        </div>
    )
}

export default UserSignUp
