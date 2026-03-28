import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import parksData from './data/parksData.js';
import TopNav from './components/TopNav';
import Search from './components/Search';
import ParkDetail from './components/ParkDetail';
import ItineraryDrawer from './components/ItineraryDrawer.jsx';


function App() {
  
const [parks] = useState(parksData);
const [itinerary, setItinerary] =useState([]);
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
      <header>
        <TopNav
          itineraryOpen={isDrawerOpen}
          onToggleItinerary={() => setIsDrawerOpen(!isDrawerOpen)}
        />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Search parks={parks} />} />
          <Route path="/park/:parkCode" element={<ParkDetail parks={parks} addToItinerary={addToItinerary} itinerary={itinerary} />} />
        </Routes>
      </main>

      <ItineraryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        itinerary={itinerary}
        onRemove={removeFromItinerary}
      />

      <footer>
        <p>Data provided by the National Park Service</p>
      </footer>
    </div>
  )
}

export default App
