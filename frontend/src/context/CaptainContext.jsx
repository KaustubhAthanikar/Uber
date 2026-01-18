import { createContext, useState, useEffect } from 'react';

export const CaptainDataContext = createContext(null);

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("captain");

    if (stored && stored !== "undefined") {
      try {
        setCaptain(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid stored captain:", stored);
        localStorage.removeItem("captain");
      }
    }
  }, []);

  const updateCaptain = (data) => {
    if (!data) {
      console.warn("Refused to save undefined captain");
      return;
    }

    setCaptain(data);
    localStorage.setItem("captain", JSON.stringify(data));
  };

  return (
    <CaptainDataContext.Provider value={{ captain, updateCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
