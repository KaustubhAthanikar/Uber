import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const navigate = useNavigate();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const token = localStorage.getItem('token');

    axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      localStorage.removeItem('token');
      navigate('/captain-login');
    })
    .catch(() => {
      localStorage.removeItem('token');
      navigate('/captain-login');
    });
  }, []);

  return null;
};

export default CaptainLogout;
