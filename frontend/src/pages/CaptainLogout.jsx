import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
      // even if logout fails, force logout on frontend
      localStorage.removeItem('token');
      navigate('/captain-login');
    });
  }, []);

  return null;
};

export default CaptainLogout;
