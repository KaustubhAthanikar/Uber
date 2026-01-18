import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = React.useState(false);
  const ridePopUpPanelRef = useRef(null);

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = React.useState(false);
  const confirmRidePopUpPanelRef = useRef(null);

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  const [ride, setRide] = useState(null)

  useEffect(() => {
    if (!socket || !captain?._id) return;

    // Join as captain
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    });

    // Function to send location
    const updateLocation = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log({
            userId: captain._id,
            llocation: {
              type: "Point",
              coordinates: [longitude, latitude]
            }
          })

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              type: "Point",
              coordinates: [longitude, latitude]
            }
          });
        },
        (error) => {
          console.error("Location error:", error);
        }
      );
    };

    // Send location immediately
    updateLocation();

    // Send location every 10 seconds
    const intervalId = setInterval(updateLocation, 10000);

    return () => clearInterval(intervalId);

  }, [socket, captain]);

  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (data) => {
      console.log("🚕 New Ride Received:", data);
      setRide(data);
      setRidePopUpPanel(true);
    };

    socket.on('new-ride', handleNewRide);

    return () => {
      socket.off('new-ride', handleNewRide);
    };
  }, [socket]);


  useGSAP(() => {
  if (!ridePopUpPanelRef.current) return;

  gsap.to(ridePopUpPanelRef.current, {
    y: ridePopUpPanel ? "0%" : "100%",
    duration: 0.4,
    ease: "power2.out"
  });
}, [ridePopUpPanel]);

useEffect(() => {
  if (ridePopUpPanelRef.current) {
    gsap.set(ridePopUpPanelRef.current, { y: "100%" });
  }
}, []);


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


  async function confirmRide(){

    const response=axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId:ride._id,
      captainId:captain._id,
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })

    socket.emit('confirm-ride',{
      userId:captain._id,
    rideId: ride._id
    })
  }


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

      {ride && (
  <div ref={ridePopUpPanelRef} className='fixed w-full z-50 bottom-0 bg-white px-3 py-10 pt-12'>
    <RidePopUp
      ride={ride}
      setRidePopUpPanel={setRidePopUpPanel}
      setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
      confirmRide={confirmRide}
    />
  </div>
)}


      <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0  bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp
        ride={ride}
        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>

    </div>
  )
}

export default CaptainHome
