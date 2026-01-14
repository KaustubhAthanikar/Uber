import React from 'react'

const LocationSearchPanel = (props) => {
  // sample array of locations
  const locations = [
    "Kalpavruksha Society Jawalkar Nagar Pimple Gurav,Pune",
    "Green Valley Apartments, Baner Road, Pune",
    "Sunshine Residency, Kothrud, Pune",
    "Ocean View Towers, Viman Nagar, Pune"
  ]
  return (
    <div >
      {/* Sample locations */}
      {
        locations.map(function(elem,index){
          return <div key={index} onClick={()=>{
            props.setVehiclePanel(true);
            props.setPanelOpen(false);
          }} className='flex border-2 rounded-xl p-3 border-gray-200 active:border-black justify-start items-center my-2 gap-2'>
        <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-line"></i></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel

