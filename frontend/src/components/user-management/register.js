import "./register.css";
import React, { useEffect, useState } from "react";

export const Register = () => {
  const [showColors, setShowColors] = useState(false);

  return (
    <div>
      <div
        className="register-div"
        onClick={() => {
          setShowColors(!showColors);
        }}
      >
        Register
      </div>
      {showColors ? (
        <div>
          <div
            onClick={() => {
              setShowColors(!showColors);
            }}
            className="register-container"
          ></div>
          <form className="register-inner-container">
            <div className="title">Sign Up</div>
            <div className="input-order">
              <input className="input" placeHolder="First Name" />
              <input className="input" placeHolder="Last Name" />
            </div>
            <div className="input-order">
              <input className="input" placeHolder="Username" />
              <input className="input" placeHolder="Email" />
            </div>
            <div className="input-order">
              <input className="input" type="password" placeHolder="Password" />
              <input
                className="input"
                type="password"
                placeHolder="Confirm Password"
              />
            </div>
            <button className="submit-btn">Submit</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Register;
