import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/Dashboard.css'; // Ensure this file contains the updated CSS styles
import emailIcon from '../assets/email-icon.png';
import optionsIcon from '../assets/options-icon.png';
import accountIcon from '../assets/account-icon.png';
import settingsIcon from '../assets/settings-icon.png';
import logoutIcon from '../assets/logout-icon.png';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || { email: '' };
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    navigate('/', { replace: true });
  };

  const handleOptionClick = (option) => {
    switch(option) {
      case 'account':
        navigate('/account');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">
        </div>
        <div className="header-right">
          <div className="user-info">
          <button className="options-button" onClick={() => setShowOptions(!showOptions)}>
            <img src={emailIcon} alt="Email Icon" className="icon email-icon"/>
            <span className="user-email">{email || 'No email available'}</span>
            </button>
            {showOptions && (
              <div className="options-menu">
                <button onClick={() => handleOptionClick('account')}>
                  <img src={accountIcon} alt="Account Icon" className="icon option-icon"/> Account
                </button>
                <button onClick={() => handleOptionClick('settings')}>
                  <img src={settingsIcon} alt="Settings Icon" className="icon option-icon"/> Settings
                </button>
                <button onClick={() => handleOptionClick('logout')}>
                  <img src={logoutIcon} alt="Logout Icon" className="icon option-icon"/> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Dashboard;
