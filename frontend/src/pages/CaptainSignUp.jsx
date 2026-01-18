import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainSignUp = () => {
  const navigate = useNavigate()
  const { updateCaptain } = useContext(CaptainDataContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
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
          vehicleType,
        },
        location: {
          type: "Point",
          coordinates: [0, 0]
        }
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      )

      if (response.status === 201) {
        const data = response.data

        updateCaptain(data.captain)
        localStorage.setItem("token", data.token)
        localStorage.setItem("captain", JSON.stringify(data.captain))

        navigate('/captain-home')
      }

    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message)
      alert(error.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-6'
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="logo"
        />

        <form onSubmit={handleSubmit}>
          <h3 className='text-lg font-medium mb-2'>Full Name</h3>
          <div className='flex gap-2 mb-6'>
            <input
              className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type='text'
              placeholder='First name'
            />
            <input
              className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type='text'
              placeholder='Last name'
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>Email</h3>
          <input
            className='bg-[#eeee] mb-3 rounded px-4 py-2 w-full text-lg'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type='email'
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input
            className='bg-[#eeee] mb-7 rounded px-4 py-2 w-full text-lg'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='password'
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Info</h3>

          <div className='flex gap-2 mb-4'>
            <input
              className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg'
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              type='text'
              placeholder='Vehicle color'
            />
            <input
              className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg'
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              type='text'
              placeholder='Plate number'
            />
          </div>

          <div className='flex gap-2 mb-6'>
            <select
              className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value=''>Select vehicle</option>
              <option value='car'>Car</option>
              <option value='bike'>Bike</option>
              <option value='auto'>Auto</option>
            </select>

            <input
              className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg'
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              type='number'
              placeholder='Capacity'
            />
          </div>

          <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg'>
            Sign Up
          </button>

          <p className='text-center mt-3'>
            Already have an account?{" "}
            <Link to="/captain-login" className='text-blue-500'>
              Login
            </Link>
          </p>
        </form>
      </div>

      <p className='text-[10px] text-gray-500'>
        By proceeding, you agree to our Terms & Privacy Policy.
      </p>
    </div>
  )
}

export default CaptainSignUp
