import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      localStorage.removeItem('token');
      navigate('/login');
    })
    .catch(() => {
      // even if logout fails, force logout on frontend
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, []);

  return null;
};

export default UserLogout;
