import React from 'react'
import { getStateNames } from '../utils/stateMap';
import fallbackImage from '../assets/fallback.jpg';
import { Link } from 'react-router-dom';
import './ParkListing.css';

export default function ParkListing({ park }) {
    return (
       <Link to={`/park/${park.parkCode}`} className="park-card-link" >
        <div className="park-card">
            <div className="park-card-img">
                <img
                    src={park.image?.url || fallbackImage}
                    alt={park.image?.altText || park.fullName}
                    onError={(e) => e.target.src = fallbackImage}
                />
            </div>

            <div className="park-card-body">
                <h3 className="park-card-name">{park.fullName}</h3>
                <p className="park-card-state">{getStateNames(park.states)}</p>
                <p className="act-count">{park.activities.length} activities</p>
            </div>
        </div>
    </Link>
    );
}