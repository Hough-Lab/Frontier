import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, getAllPOI } from "../../store/actions";
import { useHistory } from "react-router-dom";
import "./RegisterScreen.css";
import Map from "../../assets/images/map.png";

const emptyUserObject = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  firstName: "",
  lastName: "",
};

export function RegisterScreen() {
  const [userObject, setUserObject] = useState(emptyUserObject);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserObject({ ...userObject, [name]: value });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    e.preventDefault();
    await dispatch(
      registerUser(
        userObject.email,
        userObject.password,
        userObject.confirmPassword,
        userObject.username,
        userObject.firstName,
        userObject.lastName
      )
    );
    dispatch(getAllPOI());
  };

  const history = useHistory();
  const handleNavBarClick = (pathString: string) => {
    console.log("in HandleNavClick");
    history.push(pathString);
  };

  return (
    <div className="registerContainer">
      <img className="mapImage" src={Map} alt="map graphic" />

      <div className="registerBox">
        <form onSubmit={handleSubmit} className="registerForm">
          <input
            name="username"
            onChange={handleInputChange}
            value={userObject.username}
            className="formInput"
            type="text"
            placeholder="Username"
          />
          <input
            name="firstName"
            onChange={handleInputChange}
            value={userObject.firstName}
            className="formInput"
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            onChange={handleInputChange}
            value={userObject.lastName}
            className="formInput"
            type="text"
            placeholder="Last Name"
          />
          <input
            name="email"
            onChange={handleInputChange}
            value={userObject.email}
            className="formInput"
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            onChange={handleInputChange}
            value={userObject.password}
            className="formInput"
            type="password"
            placeholder="Password"
          />
          <input
            name="confirmPassword"
            onChange={handleInputChange}
            value={userObject.confirmPassword}
            className="formInput"
            type="password"
            placeholder="Confirm Password"
          />
          <button
            onClick={() => handleNavBarClick("/")}
            type="submit"
            className="registerButton"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
