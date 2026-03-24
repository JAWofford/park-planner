import React, { useState } from 'react';
import parksData from '../data/parksData';

export default function Search() {
  const [parks] = useState(parksData);

  const [selectedState, setSelectedState] = useState('');
  const [selectedPark, setSelectedPark] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [filteredParks, setFilteredParks] = useState(null);

  // Derive dropdown options from parks data
  const states = [...new Set(parks.flatMap(park => park.states.split(',')))].sort();

  const parkNames = [...parks.map(park => park.fullName)].sort();

  const activities = [
    ...new Set(parks.flatMap(park => park.activities.map(a => a.name)))
  ].sort();

  const handleSearch = () => {
    const results = parks.filter(park => {
      const matchesState    = !selectedState    || park.states.includes(selectedState);
      const matchesPark     = !selectedPark     || park.fullName === selectedPark;
      const matchesActivity = !selectedActivity || park.activities.some(a => a.name === selectedActivity);
      return matchesState && matchesPark && matchesActivity;
    });
    setFilteredParks(results);
  };

  const handleClear = () => {
    setSelectedState('');
    setSelectedPark('');
    setSelectedActivity('');
    setFilteredParks(null);
  };

  return (
    <div>
      <div className="search-banner">
        <h2>Find Your Next Adventure</h2>
        <p>Search 400+ national parks, monuments, and recreation areas</p>

        <div className="search-controls">
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
            <option value="">State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select value={selectedPark} onChange={e => setSelectedPark(e.target.value)}>
            <option value="">Parks</option>
            {parkNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <select value={selectedActivity} onChange={e => setSelectedActivity(e.target.value)}>
            <option value="">Activity</option>
            {activities.map(activity => (
              <option key={activity} value={activity}>{activity}</option>
            ))}
          </select>

          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClear}>Clear</button>
        </div>

        {/* Results will go here — replace this with your ParkInfo component later */}
        {filteredParks !== null &&
          (filteredParks.length === 0 ? (
            <p>No parks found. Try adjusting your filters</p>
          ) : (
            <div className="search-results">
              <p>{filteredParks.length} park(s) found</p>
              {filteredParks.map(park => (
                <div key={park.id}>{park.fullName}</div>
              ))}
            </div>
          ))}
      </div> 
    </div>
  );
}