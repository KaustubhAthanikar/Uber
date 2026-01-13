import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'


const CaptainSignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: Number(vehicleCapacity),
                vehicleType: vehicleType
            }
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

        if (response.status === 201) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    }
    return (
        <div className='p-7 h-screen flex flex-col '>
            <div>
                <img className='w-16 ' src="https://pngimg.com/d/uber_PNG24.png" />
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
                            placeholder='First name'
                        />
                        <input
                            className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            required
                            type='text'
                            placeholder='Last name'
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

                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-2 mb-6'>
                        <input
                            className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            required
                            type='text'
                            placeholder='Vehicle color'
                        />
                        <input
                            className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            required
                            type='text'
                            placeholder='License plate'
                        />
                    </div>
                    <div className='flex gap-2 mb-6'>
                        <select
                            className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg'
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            required
                        >
                            <option value=''>Select vehicle type</option>
                            <option value='car'>Car</option>
                            <option value='bike'>Bike</option>
                            <option value='auto'>Auto</option>
                        </select>
                        <input
                            className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                            required
                            type='number'
                            placeholder='Capacity'
                        />
                    </div>
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                    >Sign Up</button>
                    <p className='text center'>Already have an account? <Link to="/captain-login" className='text-blue-500'>Login </Link></p>
                </form>
            </div>
            <p className='text-[10px]'>By proceeding, you agree to the Terms of Service and Privacy Policy.</p>
            <div>

            </div>

        </div>
    )
}

export default CaptainSignUp
