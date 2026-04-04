import React from 'react'
import { getStateNames } from '../utils/stateMap';
import fallbackImage from '../assets/fallback.jpg';
import { Link } from 'react-router-dom';
import './ParkListing.css';
import { getOptimizedImage } from '../utils/imageHelper';

export default function ParkListing({ park }) {
    //change on real API call to handle an array
const image = park.image;
const cloudURL = getOptimizedImage(image?.url);
const npsURL = image?.url;

    return (
       <Link to={`/park/${park.parkCode}`} className="park-card-link" >
        <div className="park-card">
            <div className="park-card-img">
                <img
                        src={cloudURL || fallbackImage}
                        alt={image?.altText || park.fullName}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="225"
                        onError={(e) => {
                            if (e.target.src !== npsURL && npsURL){
                                e.target.src= npsURL;
                            } else {
                                e.target.src= fallbackImage
                            } 
                        }}
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