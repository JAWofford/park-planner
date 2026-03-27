import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import thingsToDo from '../data/thingsToDo';

export default function ParkDetail({parks}) {
      const {parkCode} = useParams();
      const filteredActivities = thingsToDo.filter((act) => act.relatedParks.some(p =>p.parkCode === parkCode));
      const park = parks.find(p => p.parkCode === parkCode);

      const [openCategory, setOpenCategory] = useState(null);

const toggleCategory = (category) => {
  setOpenCategory(prev => prev === category ? null : category);
};

const grouped = filteredActivities.reduce((acc, activity) => {
  activity.activities.forEach(act => {
    if (!acc[act.name]) acc[act.name] = [];
    acc[act.name].push(activity);
  });
  return acc;
}, {});

console.log('grouped:', grouped);

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

      <ul className="activity-categories">
  {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([category, items]) => (
    <li key={category} className="activity-category">
      <button onClick={() => toggleCategory(category)}>
        {category}
      </button>
      {openCategory === category && (
        <ul className="activity-list">
          {items.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </li>
  ))}
</ul>
    </div>
  )
}
