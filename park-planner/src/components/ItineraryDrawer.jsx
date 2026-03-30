import React from 'react';
import ItineraryItem from './ItineraryItem';
//import './ItineraryDrawer.css';

export default function ItineraryDrawer({ isOpen, onClose, itinerary, onRemove }) {

const grouped = itinerary.reduce((acc, item) => {
  const parkName = item.relatedParks?.[0]?.fullName || 'Unknown Park';
  if (!acc[parkName]) acc[parkName] = [];
  acc[parkName].push(item);
  return acc;
}, {});

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
                        Object.entries(grouped).map(([parkName, items]) => (
                            <div key={parkName} className="itinerary-park-group">
                                <div className="itinerary-park-name">{parkName}</div>
                                <ul className="itinerary-list">
                                    {items.map(item => (
                                        <ItineraryItem
                                            key={item.id}
                                            item={item}
                                            onRemove={onRemove}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>    
    </>
    );
}