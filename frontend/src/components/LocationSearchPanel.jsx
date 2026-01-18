import React from 'react';

const LocationSearchPanel = ({ suggestions,  setPickup,setDestination, activeField }) => {
  return (
    <div>
      {Array.isArray(suggestions) && suggestions.map((elem, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              if(activeField==='pickup'){
                setPickup(elem.name);        // fill input
              }
              if(activeField==='destination'){
                setDestination(elem.name)
              }
              // setVehiclePanel(true); // open next panel
              // setPanelOpen(false);   // close search panel
            }}
            className="flex border-2 rounded-xl p-3 border-gray-200 active:border-black justify-start items-center my-2 gap-2 cursor-pointer"
          >
            <h2 className="bg-[#eee] h-10 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className="font-medium">{elem.name}</h4>
              <p className="text-sm text-gray-500">{elem.country}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
