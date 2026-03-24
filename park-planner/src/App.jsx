import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
//import parksData from './data/parks.js';
//import thingsToDoData from './data/thingsToDo.js';
import TopNav from './components/TopNav';
import Search from './components/Search';
import ParkDetail from './components/ParkDetail';


function App() {
  
// const [parks, setParks] = useState(parksData);
// const [thingsToDo, setThingsToDo] = useState(thingsToDoData);
const [itineraryOpen, setItineraryOpen] = useState(false);

  return (
    <div className="app">
      <header>
        <TopNav
          itineraryOpen={itineraryOpen}
          onToggleItinerary={() => setItineraryOpen(!itineraryOpen)}
        />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/detail" element={<ParkDetail />} />
        </Routes>
      </main>

      <footer>
        <p>Data provided by the National Park Service</p>
      </footer>
    </div>
  )
}

export default App
