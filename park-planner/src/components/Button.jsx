import React from 'react';
import './Button.css';

export default function Button({className, onClick, type = "button", label, title =""}) {
  return (
    <button
      type={type}
      className={`app-button ${className || ""}`}
      onClick={onClick} title={title}>
      {label}
    </button>
  );
}
