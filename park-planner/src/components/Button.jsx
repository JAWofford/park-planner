import React from 'react';
import './Button.css';

export default function Button({className, onClick, type = "button", label}) {
  return (
    <button
      type={type}
      className={`app-button ${className || ""}`}
      onClick={onClick} >
      {label}
    </button>
  );
}
