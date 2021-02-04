import React from 'react';
import './NavBar.css';

export const NavBar = () => {
  return (
    <div className="nav">
      <div className="burger">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div className="menu"></div>
      <div className="logout"></div>
    </div>
  );
};

// onclick="myFunction(this)
