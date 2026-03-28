import React from 'react';
import ItineraryItem from './ItineraryItem';
//import './ItineraryDrawer.css';

export default function ItineraryDrawer({ isOpen, onClose, itinerary, onRemove }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="drawer-backdrop" onClick={onClose} />}

      {/* Drawer */}
      <div className={`itinerary-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>My Itinerary</h3>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          {itinerary.length === 0 ? (
            <div className="drawer-empty">
              <p>No activities added yet.</p>
              <p>Browse a park and add things to do.</p>
            </div>
          ) : (
            <ul className="itinerary-list">
              {itinerary.map(item => (
                <ItineraryItem
                  key={item.id}
                  item={item}
                  onRemove={onRemove}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}