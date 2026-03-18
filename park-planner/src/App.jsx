//import { useState } from 'react'
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

  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/discover" element={<Search />}/>
        <Route path="/detail" element={<ParkDetail />} />
      </Routes>
    </>
  )
}

export default App
