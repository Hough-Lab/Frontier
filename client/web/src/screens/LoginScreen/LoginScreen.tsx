import React from 'react';
import './LoginScreen.css';

export function LoginScreen() {
  return (
    <div className="registerContainer">
      <div className="registerBox">
        <div></div>
        <form className="registerForm">
          <input className="formInput" type="text" placeholder="username" />
          <input className="formInput" type="password" placeholder="password" />
          <button className="registerButton">Login</button>
          <button className="registerButton">Don't have an account?</button>
        </form>
      </div>
    </div>
  );
}
