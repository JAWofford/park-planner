
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import "./TopNav.css";


export default function TopNav({ itineraryOpen, onToggleItinerary, count, handleClear }) {


  return (
    <div className='topnav'>
      <img className='logo' src={logo} alt="Logo" />

      <div className="nav-tabs">
        <Link
          to="/"
          onClick={handleClear} //Reset itinerary/trip state when navigating home
          className="nav-tab home" >
          Home
          </Link>

      </div>

      {/* handles itinerary drawer toggle, item count display*/}
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