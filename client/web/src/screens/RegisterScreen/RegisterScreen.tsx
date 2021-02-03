import React from "react";
import "./RegisterScreen.css";

export function RegisterScreen() {
  return (
    <div className="container">
      <div className="Login">
        <div>
          <img
            src="img_frontier_logo.jpg"
            alt="Frontier Logo"
            width="500"
            height="600"
          />
        </div>
        <h4>Enter Username and Password</h4>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
      </div>
    </div>
  );
}
