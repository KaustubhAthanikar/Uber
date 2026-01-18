import React, { useState, useRef, use, useContext, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from "axios";
import { SocketContext } from '../context/SocketContext';
import {UserDataContext} from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('pickup');

  const [fare, setFare] = useState(null)
  const [vehicleType, setVehicleType] = useState(null)

  const panelRef = useRef(null);
  const vehicleFoundRef = useRef(null);

  const panelCloseRef = useRef(null);

  const {socket} = useContext(SocketContext);
  const {user,setUser} = useContext(UserDataContext);

  const [ride, setrRide] = useState(null)

  
 useEffect(() => {
  if (!user || !socket || !user._id) return;

  console.log("EMITTING JOIN:", user._id);

  socket.emit("join", {
    userType: "user",
    userId: user._id
  });



}, [user, socket]);

socket.on('ride-confirmed',ride =>{
  setVehicleFound(false);
  setWaitingForDriver(true);
  setrRide(ride);
})


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(pickup, destination);
  };

  const fetchSuggestions = async (text) => {
    try {
      if (!text) return;

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: text },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (Array.isArray(res.data)) {
        setSuggestions(res.data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Suggestion fetch failed:", error);
      setSuggestions([]);
    }
  };


  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 0.4,
        ease: 'power2.out',
        opacity: 1,
        padding: 24
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.4,
        ease: 'power2.in',
        opacity: 0
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [vehiclePanel]);


  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [confirmRidePanel]);


  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [waitingForDriver]);

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(response.data)
    setFare(response.data);
  }

  async function createRide() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType   // "car" | "bike" | "auto"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log("Ride created:", res.data);
    } catch (err) {
      console.error("Ride creation failed:", err.response?.data || err.message);
    }
  }
  
  socket.on('ride-started',ride=>{
    setWaitingForDriver(false),
    navigate('/ride',{state:{ride}})

  })

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />

      <div className="h-screen w-screen fixed top-0 left-0 z-0">
  <LiveTracking />
</div>

      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-[30%] p-5 pb-0 bg-white relative">
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false);
          }} className='absolute opacity-0 top-6 right-6 text-xl'><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>

          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full "></div>

            <input
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              value={pickup}
              onChange={(e) => {
                setActiveField('pickup')
                setPickup(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              type="text"
              placeholder="Enter pickup location"
            />

            <input
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              value={destination}
              onChange={(e) => {
                setActiveField('destination')
                setDestination(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className='flex justify-center items-center bg-black text-white px-4 py-1 rounded-lg w-full text-lg h-8 mt-3'>
            Find Ride
          </button>
        </div>

        {/* Sliding Panel */}
        <div
          ref={panelRef}
          className="h-0 opacity-0 bg-white "
        >
          <LocationSearchPanel suggestions={suggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField} />
        </div>
      </div>


      <div ref={vehiclePanelRef} className=' fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel
          selectVehicleType={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}

        />
      </div>


      <div ref={confirmRidePanelRef} className=' fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className=' fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver
        pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
        setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className=' fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
        <WaitingForDriver 
        ride={ride}
        setVehicleFound={setVehicleFound}
        setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
