import React from 'react';
import { useParams } from 'react-router-dom';
import thingsToDo from '../data/thingsToDo';

export default function ParkDetail({parks}) {
      const {parkCode} = useParams();
      const filteredActivities = thingsToDo.filter((act) => act.relatedParks.some(p =>p.parkCode === parkCode));
      const park = parks.find(p => p.parkCode === parkCode);

  
      console.log('thingsToDo:', thingsToDo);
      console.log('parkCode:', parkCode);
      console.log('filtered activities:', filteredActivities);
      console.log('first item relatedParks:', thingsToDo[0].relatedParks);
    

  return (
    
    <div>
      <div className="park-detail-header">
      {!park ? (
        <p>Park not found.</p>
      ) : (
        <div>
          <h2>{park.fullName}</h2>
          <p>{park.description}</p>
        </div>
      )}
      </div>
    </div>
  )
}
