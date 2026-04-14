
import ParkListing from './ParkListing';
import { stateMap } from '../utils/stateMap';
import './Search.css';


export default function Search({
  parks, 
  filteredParks, 
  setFilteredParks, 
  selectedState, 
  setSelectedState, 
  selectedPark, 
  setSelectedPark, 
  selectedActivity, 
  setSelectedActivity, 
  handleClear}) {
  
 //build default list of featured parks.
 const featured = ['glac', 'yose', 'zion', 'arch'];
const featuredParks = parks.filter(p => featured.includes(p.parkCode));

  // Get dropdown options from parks data
  const states = [...new Set(parks.flatMap(park => park.states.split(',')))];
  const sortedStates = states.sort((a, b) =>
  stateMap[a].localeCompare(stateMap[b])
);

  const parkNames = [...parks.map(park => park.fullName)].sort();

  const activities = [
    ...new Set(parks.flatMap(park => park.activities.map(a => a.name)))
  ].sort();

  //search based on user choices
  const handleSearch = () => {
    const results = parks.filter(park => {
      const matchesState    = !selectedState    || park.states.includes(selectedState);
      const matchesPark     = !selectedPark     || park.fullName === selectedPark;
      const matchesActivity = !selectedActivity || park.activities.some(a => a.name === selectedActivity);
      return matchesState && matchesPark && matchesActivity;
    });
    setFilteredParks(results);
  };


  return (
    <div>
      <div className="search-banner">
        <h2 className="search-banner-title">Find Your Next Adventure</h2>
        <p className="search-banner-intro">Search 400+ national parks, monuments, and recreation areas to plan the perfect trip.</p>

        <div className="search-controls">
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
            <option value="">State</option>
            {sortedStates.map(abbr => (
              <option key={abbr} value={abbr}>{stateMap[abbr]}</option>
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

          <button className="search-btn" onClick={handleSearch}>Search</button>
          <button className="clear-btn" onClick={handleClear}>Clear</button>
        </div>
        
      </div>      
      
      <div className="search-results">
        {filteredParks === null ? (
          <div className="featured-parks">
            <p className="featured-label">Popular Parks</p>
            <div className="park-grid">
              {featuredParks.map(park => (
                <ParkListing key={park.parkCode} park={park} />
              ))}
            </div>
          </div>
        ) : filteredParks.length === 0 ? (
          <p>No parks found. Try adjusting your filters</p>
        ) : (
          <div>
            <p>{filteredParks.length} park(s) found</p>
            <div className="park-grid">
              {filteredParks.map(park => (
                <ParkListing key={park.parkCode} park={park} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}