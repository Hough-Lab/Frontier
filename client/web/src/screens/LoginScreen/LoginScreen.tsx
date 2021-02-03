import React from "react";
import "./LoginScreen.css";

export function LoginScreen() {
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
        <button>Login</button>
        <button>Sign Up</button>
        <form></form>
      </div>
    </div>
  );
}
