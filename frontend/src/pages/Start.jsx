import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div>
            <div className="
                h-screen w-full flex flex-col justify-between pt-5 bg-cover bg-center
                bg-[url('https://images.unsplash.com/photo-1557404763-69708cd8b9ce')]
                md:bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')]
            ">
                <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
                <div className='bg-white py-4 px-4 pb-7'>
                    <h2 className='font-bold text-3xl'>Get started with Uber</h2>
                    <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Start
