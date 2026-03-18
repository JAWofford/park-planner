import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';


export default function TopNav() {
const [activeTab, setActiveTab] = useState('discover');

  return (
    <div className='topnav'>
      <img className='logo' src={logo} alt="Logo" />

      <div className="nav-tabs">
        <Link 
          to="/discover"
          className={`nav-tab ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => setActiveTab('discover')}>
          <span className="nav-dot"></span> Discover Parks
        </Link>

        <Link
          to="/detail"
          className={`nav-tab ${activeTab === 'detail' ? 'active' : ''}`}
          onClick={() => setActiveTab('detail')}>
          <span className="nav-dot"></span> Park Details
        </Link>
      </div>

      <div className="nav-right">
        <div className="itinerary-toggle" id="itin-toggle">
          <span className="it-icon">🗺</span>
          My Itinerary
          <span className="it-arrow">▲</span>
        </div>
      </div>
    </div>
  );
}