import React, {useState} from 'react';
import parksData from '../data/parksData';

export default function Search() {
  
  const [parks] = useState(parksData);
    const [selectedState, setSelectedState] = useState('');

  const states = [
    ...new Set(
      parks.flatMap(park => park.states.split(','))
    )
  ].sort();
  
  return (
    
  <div>
    <div className="search-banner">
      <h2>Find Your Next Adventure</h2>
      <p>Search 400+ national parks, monuments, and recreation areas</p>
      
        <select
          value={selectedState}
          onChange={(evt) => setSelectedState(evt.target.value)}
        >
          <option value="">All States</option>

          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      
    </div>
  </div>
  )
}
