import React, { useRef } from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0  w-[93%]'
                onClick={() => {
                    props.setRidePopUpPanel(false);
                }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
            <h3 className='text-2xl font-semibold mb-3'>New ride available</h3>

            <div className='flex items-center justify-between mt-4 bg-yellow-400 p-3 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
                    <h2 className='text-xl font-medium'>{props.ride?.user?.fullname?.firstname+" "+props.ride?.user?.fullname?.lastname}</h2>

                </div>
                <h5 className='text-lg font-semibold'>2.2Km</h5>
            </div>

            <div className='flex flex-col gap-2 justify-between items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-3 p-3 border-b-2 border-gray-200'>
                        <h4><i className="text-lg ri-map-pin-line"></i></h4>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-gray-600 text-sm -mt-1'> {props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 p-3 border-b-2 border-gray-200'>
                        <h4><i className="text-lg ri-map-pin-line"></i></h4>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-gray-600 text-sm -mt-1'> {props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 p-3 '>
                        <h4 className='text-xl'><i className="ri-money-rupee-circle-line"></i></h4>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Cash</p>
                        </div>
                    </div>

                </div>
                <div className=' mt-5 w-full'>
                    <button onClick={() => {
                    props.setConfirmRidePopUpPanel(true)
                    props.confirmRide()
                }
                } className='w-full bg-green-500 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>

                <button onClick={() => {
                   props.setRidePopUpPanel(false)
                }
                } className='w-full mt-2 bg-gray-400 text-white font-semibold p-3 px-10 rounded-lg'>Ignore</button>
                </div>

            </div>
        </div>
    )
}

export default RidePopUp
