import React from 'react';
import './Tripinfo.css';
import Button from './Button';

export default function TripInfo({ tripInfo, isEditing, errors, onEdit, onCancel, handleChange, handleSubmit }) {
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="trip-info">
      {/* -display trip info if not in edit mode
      - display input fields if in edit mode */}
      {!isEditing ? (
        <div className="trip-display">
          {tripInfo.title
            && <div className="trip-info-title">{tripInfo.title}</div>
          }

          {tripInfo.startDate && tripInfo.endDate && (
            <div className="trip-info-dates">{(formatDate(tripInfo.startDate)).split(",")[0]} — {formatDate(tripInfo.endDate)}</div>
          )}

          {tripInfo.notes && <div className="trip-info-notes">{tripInfo.notes}</div>}
         
          {/* Edit Button */}
          <Button 
          className="trip-info-edit"
          onClick={onEdit}
          label={!tripInfo.title ? 'Add Trip Information' : '✏ Edit'}
          />
        </div>
      ) : (
        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Trip Title</label>
            <input
              type="text"
              placeholder="My National Parks Trip"
              value={tripInfo.title}
              onChange={e => handleChange('title', e.target.value)}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-field">
            <label>Start Date</label>
            <input
              type="date"
              value={tripInfo.startDate}
              onChange={e => handleChange('startDate', e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>End Date</label>
            <input
              type="date"
              value={tripInfo.endDate}
              onChange={e => handleChange('endDate', e.target.value)}
            />
            {errors.endDate && <span className="form-error">{errors.endDate}</span>}
          </div>

          <div className="form-field">
            <label>Notes</label>
            <textarea
              placeholder="Any notes about your trip..."
              value={tripInfo.notes}
              onChange={e => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-actions">
            <Button 
              type='submit'
              className='trip-info-save'
              label='Save'
            />

            <Button 
              className="trip-info-cancel"
              onClick={onCancel}
              label="Cancel"
            />
            {/* <button type="submit" className="trip-info-save">Save</button>
            <button type="button" className="trip-info-cancel" onClick={onCancel}>Cancel</button> */}
          </div>
        </form>
      )}
    </div>
  );
}