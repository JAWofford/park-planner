import React from 'react';
import logo from '../assets/logo2.png';


export default function TopNav() {
  return (
    <div className='topnav'>
      <img className='logo' src={logo} alt="Logo" />
      <div class="nav-tabs">
        <div class="nav-tab active" id="nav-search">
          <span class="nav-dot"></span> Discover Parks
        </div>
        <div class="nav-tab" id="nav-info" >
          <span class="nav-dot"></span> Park Details
        </div>
      </div>
      <div class="nav-right">
        <div class="itinerary-toggle" id="itin-toggle" >
          <span class="it-icon">🗺</span>
          My Itinerary
          <span class="it-arrow">▲</span>
        </div>
      </div>
    </div>  
      )
}
