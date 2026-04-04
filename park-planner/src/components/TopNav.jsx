import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import discIcon from '../assets/compass-rose.png';
import "./TopNav.css";


export default function TopNav({itineraryOpen, onToggleItinerary, count}) {
const [activeTab, setActiveTab] = useState('discover');

  return (
    <div className='topnav'>
      <img className='logo' src={logo} alt="Logo" />

      <div className="nav-tabs">
        <Link 
          to="/"
          className={`nav-tab ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => setActiveTab('discover')}>
          {/* <span className="nav-dot"></span> Discover Parks */}
          <img className='disc-icon' src={discIcon} alt="compass"/> Discover Parks
        </Link>

        {/* <Link
          // to="/park.:parkCode"
          to={parkCode ? `/park/${parkCode}` : '/park'}
          className={`nav-tab ${activeTab === 'detail' ? 'active' : ''}`}
          onClick={() => setActiveTab('detail')}>
          <span className="nav-dot"></span> Park Details
        </Link>*/}
      </div>

      <div className="nav-right">
        <div className={`itinerary-toggle ${itineraryOpen ? 'open' : ''}`}
        onClick={onToggleItinerary}>
          <span className="it-icon">🗺</span>
          My Itinerary
          <span className="it-count">{count}</span>
          <span className={`it-arrow ${itineraryOpen ? 'down' : ''}`}>▲</span>
        </div>
      </div>
    </div>
  );
}