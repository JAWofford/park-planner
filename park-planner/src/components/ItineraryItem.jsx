import React from 'react';
import Badge from './Badge';

export default function ItineraryItem({ item, onRemove }) {
    return (
        <li className="itinerary-item">
            <div className="itinerary-item-body">
                <div className="itinerary-item-title">{item.title}</div>
                <div className="itinerary-badges">
                    <Badge type="duration" label={item.duration} icon="⏱" />
                    {item.doFeesApply === 'true'
                        && <Badge type="fee" label="Fee" icon="$" />
                    }
                    {item.arePetsPermitted === 'true' &&
                        <Badge type="pets" label="Pets OK" icon="🐾" />
                    }
                    {item.isReservationRequired === 'true' &&
                        <Badge type="reservation" label="Reservation" icon="📋" />
                    }
                </div>
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