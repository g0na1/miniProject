import React from 'react';
import { useNavigate } from 'react-router-dom';
import './First.css'; // تأكد من أن لديك التنسيقات هنا

const First = () => {
  const navigate = useNavigate();

  return (
    <div className="first-container">
      <h1 className="title">Ghosoon Beauty Website</h1>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/login')}>
          User
        </button>
        <button className="button" onClick={() => navigate('/admin')}>
          Admin
        </button>
      </div>
    </div>
  );
};

export default First;