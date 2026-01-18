import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          rideId: props.ride?._id,
          otp: otp
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 200) {
        props.setConfirmRidePopUpPanel(false);
        props.setRidePopUpPanel(false);
        navigate('/captain-riding',{state:{ride:props.ride,}});
      }
    } catch (error) {
      console.error(error);
      console.log("BACKEND ERROR:", error.response?.data);
      alert("Invalid OTP or failed to start ride");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-[90%]'>
      <h5
        className='p-1 text-center absolute top-0 w-[93%]'
        onClick={() => props.setConfirmRidePopUpPanel(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-3'>Confirm this ride to start</h3>

      <div className='flex items-center justify-between mt-4 bg-yellow-400 p-3 rounded-lg'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover'
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
            alt=""
          />
          <h2 className='text-xl font-medium capitalize'>
            {props.ride?.user?.fullname?.firstname}
          </h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2Km</h5>
      </div>

      <div className='flex flex-col gap-2 justify-between items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-3 p-3 border-b-2 border-gray-200'>
            <i className="text-lg ri-map-pin-line"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-gray-600 text-sm -mt-1'>
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 p-3 border-b-2 border-gray-200'>
            <i className="text-lg ri-map-pin-line"></i>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-gray-600 text-sm -mt-1'>
                {props.ride?.destination}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 p-3'>
            <i className="text-xl ri-money-rupee-circle-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-gray-600 text-sm -mt-1'>Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type='text'
              className="bg-[#eee] px-6 py-4 font-mono text-base rounded-lg w-full mt-3"
              placeholder='Enter OTP'
            />

            <button
              disabled={loading}
              className='w-full text-lg flex justify-center mt-3 bg-green-500 text-white font-semibold p-2 rounded-lg'
            >
              {loading ? "Starting..." : "Confirm"}
            </button>

            <button
              type="button"
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}
              className='w-full mt-3 bg-red-500 text-lg text-white font-semibold p-2 rounded-lg'
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
