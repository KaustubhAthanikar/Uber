import React ,{useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {
  const context = useContext(CaptainDataContext);

  const {captain} = useContext(CaptainDataContext)


  return (
    <div className='h-2/5 p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="data:image/jpeg;base64,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" alt="" />
            <h4 className='text-lg font-medium capitalize'>{captain?.fullname?.firstname+ " " + captain?.fullname?.lastname}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹ 1245</h4>
            <p className='text-sm text-center text-gray-600 '>Earned</p>
          </div>
        </div>
        <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-4 items-start'>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.5</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-dashboard-3-line"></i>
            <h5 className='text-lg font-medium'>10.5</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.5</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
      </div>
  )
}

export default CaptainDetails
