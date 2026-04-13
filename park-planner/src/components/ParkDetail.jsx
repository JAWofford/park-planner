import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import thingsToDo from '../data/thingsToDo';
import Badge from './Badge';
import Button from './Button';
import './ParkDetail.css';

export default function ParkDetail({ parks, addToItinerary, removeFromItinerary, itinerary }) {

  const { parkCode } = useParams();
  //get activities for this park based on parkCode
  const filteredActivities = thingsToDo.filter((act) => act.relatedParks.some(p => p.parkCode === parkCode));

  const park = parks.find(p => p.parkCode === parkCode);

  //toggle open/closed state for a category
  const [openCategory, setOpenCategory] = useState(null);
  const toggleCategory = (category) => {
    setOpenCategory(prev => prev === category ? null : category);
  };

  //group activities by category name
  const grouped = filteredActivities.reduce((acc, activity) => {
    activity.activities.forEach(act => {
      if (!acc[act.name]) acc[act.name] = [];
      acc[act.name].push(activity);
    });
    return acc;
  }, {});

  //check if activity already in itinerary (prevent duplicates)
  const isAdded = (id) => itinerary.some(item => item.id === id);

  return (

    <div className="park-detail">
      <div className="park-detail-header">
        {!park ? (
          <p>Park not found.</p>
        ) : (
          <div>
            <div className="back-link"><Link to="/" className="back-link">← Back to Results</Link></div>
            <div className="park-title">{park.fullName}</div>
            <div className="park-sub">{park.address.city}, {park.address.stateCode}</div>
            <div className="park-desc">{park.description}</div>
          </div>
        )}
      </div>

      <ul className="category-list">
        {/* sort categories alphabetically for display */}
        {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([category, items]) => (
          <li key={category} className="category-section">
            <button
              className={`category-header-button ${openCategory === category ? 'open' : ''}`}
              onClick={() => toggleCategory(category)}
            >
              <span className="cat-name">{category}</span>
              <span className="cat-count">{items.length} thing(s) to do</span>
              <span className="cat-chevron">{openCategory === category ? '▲' : '▼'}</span>

            </button>

            {/* only show activity when category expanded */}
            {openCategory === category && (
              <ul className="activity-list">
                {items.map(item => (
                  <li key={item.id} className={`todo-tile ${isAdded(item.id) ? 'selected' : ''}`}>

                    <div className="todo-body">
                      <div className="todo-title">{item.title}</div>
                      <div className="todo-desc">{item.shortDescription}</div>

                      <div className="todo-badges">
                        <Badge type="duration" label={item.duration} icon="⏱" />
                        {item.doFeesApply === 'true'
                          ? <Badge type="fee" label="Fee Required" icon="$" />
                          : <Badge type="free" label="FREE" />
                        }
                        {item.arePetsPermitted === 'true' &&
                          <Badge type="pets" label="Pets OK" icon="🐾" />
                        }
                        {item.isReservationRequired === 'true' &&
                          <Badge type="reservation" label="Reservation Required" icon="📋" />
                        }
                      </div>

                      <div className="todo-actions">
                        {/*Add Button - appearance toggles */}

                        <Button
                          className={`todo-add-btn ${isAdded(item.id) ? 'added' : ''}`}
                          onClick={() => addToItinerary(item)}
                          label={isAdded(item.id) ? '✓ Added' : '+ Add'}
                        />

                        {/* Remove Button - shown only if item already in itinerary*/}
                        {isAdded(item.id) &&
                          <Button
                            className="todo-remove-btn"
                            onClick={() => removeFromItinerary(item.id)}
                            label='Remove'
                          />
                        }
                      </div>

                    </div>

                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
