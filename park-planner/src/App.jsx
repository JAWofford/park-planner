import { useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import parksData from './data/parksData.js';
import TopNav from './components/TopNav';
import Search from './components/Search';
import ParkDetail from './components/ParkDetail';
import ItineraryDrawer from './components/ItineraryDrawer.jsx';
import About from './components/About.jsx';
import Button from './components/Button.jsx';


function App() {
  
const [parks] = useState(parksData);
const [itinerary, setItinerary] = useState([]);
const [isDrawerOpen, setIsDrawerOpen] = useState(false);


//passed to ParkDetail
const addToItinerary = (item) => {
  setItinerary(prev => {
    if (prev.some(i => i.id === item.id)) return prev;
    return [...prev, item];
  });
};

const removeFromItinerary = (id) => {
  setItinerary(prev=> prev.filter(item => item.id !== id));
}


  return (
    <div className="app">
      <header className="app-header">
        <TopNav
          itineraryOpen={isDrawerOpen}
          onToggleItinerary={() => setIsDrawerOpen(!isDrawerOpen)}
          count={itinerary.length}
        />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Search parks={parks} />} />
          <Route path="/park/:parkCode" element={<ParkDetail parks={parks} addToItinerary={addToItinerary} removeFromItinerary={removeFromItinerary} itinerary={itinerary} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <ItineraryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        itinerary={itinerary}
        onRemove={removeFromItinerary}
      />

      <footer>
        <div>
          <Link to="/about" className="about-link">
          <Button 
            className="about-btn"
            label="About"
            />
          </Link>
        </div>
        <p>Data provided by the National Park Service</p>
      </footer>
    </div>
  )
}

export default App
