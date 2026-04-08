import React from 'react';
import { useState, useEffect } from 'react';
import ItineraryItem from './ItineraryItem';
import './ItineraryDrawer.css';
import TripInfo from './TripInfo';
import Button from './Button';

export default function ItineraryDrawer({ isOpen, onClose, itinerary, onRemove, onClear }) {

    // const [tripInfo, setTripInfo] = useState({
    //     title: '',
    //     startDate: '',
    //     endDate: '',
    //     notes: ''
    // });

    //get from local storage if it exists
    const [tripInfo, setTripInfo] = useState(() => {
        const saved = localStorage.getItem('tripInfo');
        return saved ? JSON.parse(saved) : {
            title: '',
            startDate: '',
            endDate: '',
            notes: ''
        };
    });

    //write to localStorage when tripInfo changes
    useEffect(() => {
        localStorage.setItem('tripInfo', JSON.stringify(tripInfo));
    }, [tripInfo]);

    //Clear tripInfo from state and localStorage
   const clearTripInfo = () => {
    setTripInfo({
        title: '',
        startDate: '',
        endDate: '',
        notes: ''
    });
    localStorage.removeItem('tripInfo');
};


    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    // validates Tripinfo form fields
    const validate = () => {
        const newErrors = {};
        if (!tripInfo.title.trim()) {
            newErrors.title = 'Trip title is required.';
        }
        if (tripInfo.title.length > 50) {
            newErrors.title = 'Title must be 50 characters or less.';
        }
        if (tripInfo.startDate && tripInfo.endDate && tripInfo.endDate < tripInfo.startDate) {
            newErrors.endDate = 'End date must be after start date.';
        }
        return newErrors;
    };

    //handles TripInfo form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setIsEditing(false);
    };

    //TripInfo edits
    const handleChange = (field, value) => {
  setTripInfo(prev => ({ ...prev, [field]: value }));
};

    const grouped = itinerary.reduce((acc, item) => {
        const parkName = item.relatedParks?.[0]?.fullName || 'Unknown Park';
        if (!acc[parkName]) acc[parkName] = [];
        acc[parkName].push(item);
        return acc;
    }, {});

    //lock page scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen])

    return (
        <>
            {/* Backdrop */}
            {isOpen && <div className="drawer-backdrop" onClick={onClose} />}

            {/* Drawer */}
            <div className={`itinerary-drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h3>My Itinerary</h3>
                    <Button
                        className="drawer-close-btn"
                        onClick={onClose}
                        label="✕"
                    />
                </div>

                <div className="drawer-trip-info">
                    <TripInfo
                        tripInfo={tripInfo}
                        isEditing={isEditing}
                        errors={errors}
                        onEdit={() => setIsEditing(true)}
                        onCancel={() => setIsEditing(false)}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleClear={clearTripInfo}
                    />
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

                <div className="drawer-footer">
                    <Button
                        className="intinerary-clear-btn"
                        onClick={onClear}
                        label="Clear Itinerary"
                    />
                </div>
            </div>
        </>
    );
}