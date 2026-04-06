import React from 'react';
import Badge from './Badge';
import './About.css';

export default function About() {
  return (
        <div className="about">
            <div className="about-title">About Park Planner</div>
            <div className="about-desc">Park Planner is a React application that allows users to
                search the activities available at our national parks and build a personalized itinerary for their visit</div>
            <div className="features-container">
                <div className="features-title">Features</div>
                <div className="features-grid">
                    <Badge
                    type="feature"
                    label="Search National Parks by name, location or activity"
                    />
                    <Badge
                    type="feature"
                    label="View listing of parks based on search criteria."
                    />
                    <Badge
                    type="feature"
                    label="Access individual park detail and a categorized listing of activities."
                    />
                    <Badge
                    type="feature"
                    label="Add and remove activities to build a personal trip itinerary"
                    />
                    <Badge
                    type="feature"
                    label="Input personalized trip information."
                    />
                </div>               
            </div>

            <div className="tech-container">
                <div className="tech-title">Technologies Used</div>
                <div className="tech-grid">
                    <Badge
                    type="tech"
                    label="React (components, state, props)"
                    />
                    <Badge
                    type="tech"
                    label="JavaScript (ES6)"
                    />
                    <Badge
                    type="tech"
                    label="CSS for styling"
                    />
                    <Badge
                    type="tech"
                    label="React Router for navigation"
                    />
                </div>
            </div>







        </div>
    )
}
