import React from 'react';
import './RegisterScreen.css';

export function RegisterScreen() {
  return (
    <div className="registerContainer">
      <div className="registerBox">
        <form className="registerForm">
          <input className="formInput" type="text" placeholder="Username" />
          <input className="formInput" type="text" placeholder="First Name" />
          <input className="formInput" type="text" placeholder="Last Name" />
          <input className="formInput" type="password" placeholder="Email" />
          <input className="formInput" type="password" placeholder="Password" />
          <input
            className="formInput"
            type="text"
            placeholder="Confirm Password"
          />
          <button className="registerButton">Register</button>
        </form>
      </div>
    </div>
  );
}
