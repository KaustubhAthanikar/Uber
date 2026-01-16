import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {
   const [ridePopUpPanel, setRidePopUpPanel] = React.useState(true);
    const ridePopUpPanelRef = useRef(null);

    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = React.useState(false);
    const confirmRidePopUpPanelRef = useRef(null);

    useGSAP(() => {
        if (ridePopUpPanel) {
            gsap.to(ridePopUpPanelRef.current, {
                transform: 'translateY(0%)',
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            gsap.to(ridePopUpPanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.4,
                ease: 'power2.in'
            });
        }
    }, [ridePopUpPanel]);
    useGSAP(() => {
        if (confirmRidePopUpPanel) {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: 'translateY(0%)',
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.4,
                ease: 'power2.in'
            });
        }
    }, [confirmRidePopUpPanel]);
  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
        />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>

      <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>

    </div>
  )
}

export default CaptainHome
