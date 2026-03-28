import React from 'react';

export default function ItineraryItem({ item, onRemove }) {
  return (
    <li className="itinerary-item">
      <div className="itinerary-item-body">
        <div className="itinerary-item-park">{item.relatedParks[0].fullName}</div>
        <div className="itinerary-item-title">{item.title}</div>
        <div className="itinerary-item-duration">{item.duration}</div>
      </div>
      <button
        className="itinerary-item-remove"
        onClick={() => onRemove(item.id)}
      >
        ✕
      </button>
    </li>
  );
}