import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const location = useLocation();
  const rideData = location.state?.ride;
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">

      {/*  MAP BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <LiveTracking />
      </div>

      {/* TOP BAR */}
      <div className="fixed z-20 p-6 top-0 left-0 w-full flex items-center justify-between">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/*  BOTTOM ACTION BAR */}
      <div
        className="fixed z-20 bottom-0 left-0 w-full bg-yellow-400 p-6 flex justify-center gap-3 items-center"
        onClick={() => setFinishRidePanel(true)}
      >
        <h4 className="text-xl font-semibold">4 Km away</h4>
        <button className="ml-3 bg-green-500 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>

      {/*  FINISH RIDE PANEL */}
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-t-xl shadow-xl"
      >
        <FinishRide
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>

    </div>
  );
};

export default CaptainRiding;
