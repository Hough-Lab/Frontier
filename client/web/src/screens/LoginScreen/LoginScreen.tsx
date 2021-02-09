import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, getAllPOI } from "../../store/actions";
import "./LoginScreen.css";
import { useHistory } from "react-router-dom";
import lottie from "lottie-web";

// import { User } from "../interfaces/reducerInterfaces";
import { validateLogin } from "../../utils/generalFunctions";
// import { SystemState } from "../interfaces/reducerInterfaces";

const emptyLoginObject = {
  email: "",
  password: "",
};

export function LoginScreen() {
  const [loginValues, setLoginValues] = useState(emptyLoginObject);
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const handleNavBarClick = (pathString: string) => {
    console.log("in HandleNavClick");
    history.push(pathString);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const handleSubmit = useCallback(async () => {
    setErrMsg("");
    setErrMsg(validateLogin(loginValues));
    try {
      await dispatch(loginUser(loginValues.email, loginValues.password));
      dispatch(getAllPOI());
    } catch (e) {
      setErrMsg("Invalid username or password.");
    }
  }, [loginValues]);

  console.log("errMsg", errMsg);

  // const Logo = () => {
  //   useEffect(() => {
  //     lottie.loadAnimation({
  //       container: document.querySelector("#react-logo"),
  //       animationData: reactLogo
  //     });
  //   }, []);

  return (
    <div className="registerContainer">
      <div className="registerBox">
        {/* <div style={{width: 400, margin: '0 auto'}} ref={ ref => this.animBox = ref}></div> */}
        <form className="registerForm" onSubmit={handleSubmit}>
          <input
            name="email"
            className="formInput"
            type="text"
            placeholder="Email"
            value={loginValues.email}
            onChange={handleInputChange}
          />

          <input
            name="password"
            className="formInput"
            type="password"
            placeholder="Password"
            value={loginValues.password}
            onChange={handleInputChange}
          />

          {errMsg.length > 1 && <div>{errMsg}</div>}

          <button
            className="registerButton"
            type="submit"
            onClick={() => handleNavBarClick("/")}
          >
            Login
          </button>

          <button
            onClick={() => handleNavBarClick("/register")}
            className="registerButton"
          >
            Don't have an account?
          </button>
        </form>
      </div>
    </div>
  );
}
