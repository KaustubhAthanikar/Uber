import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
            <h5 className='p-1 text-center absolute top-0  w-[93%]'
                onClick={() => {
                    props.setWaitingForDriver(false);
                }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
            </h5>
            
            <div className='flex items-center justify-between'>
                <img className='h-12' src="data:image/jpeg;base64,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" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>{props.ride?.captain?.fullname?.firstname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain?.vehicle?.plate}</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    <h1 className='text-lg font-semibold'> {props.ride?.otp}</h1>
                </div>
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
                            <p className='text-gray-600 text-sm -mt-1'>{props.ride?.destination}</p>
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
            </div>


        </div>
  )
}

export default WaitingForDriver
