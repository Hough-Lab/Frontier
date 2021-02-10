import React from 'react';
import './LoginScreen.css';
import { useHistory } from 'react-router-dom';

export function LoginScreen() {
  const history = useHistory();

  const handleNavBarClick = (pathString: string) => {
    console.log('in HandleNavClick');
    history.push(pathString);
  };
  return (
    <div className="registerContainer">
      <div className="registerBox">
        <div></div>
        <form className="registerForm">
          <input className="formInput" type="text" placeholder="username" />
          <input className="formInput" type="password" placeholder="password" />
          <button className="registerButton">Login</button>
          <button
            onClick={() => handleNavBarClick('/register')}
            className="registerButton"
          >
            Don't have an account?
          </button>
        </form>
      </div>
    </div>
  );
}
