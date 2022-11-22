import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../user-management/login";
import { Register } from "../user-management/register";
import "./nav-bar.css";

export const NavBar = ({ loginStatus }) => {
  const [getInputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="search-components">
          <input
            className="search-bar"
            type="text"
            onChange={(res) => setInputValue(res.target.value)}
          ></input>
          <button
            className="search-button"
            onClick={() => {
              if (getInputValue.length !== 0) {
                navigate(`/search/${getInputValue}`);
              }
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="user-buttons">
        <Register loginStatus={loginStatus} />
        <Login loginStatus={loginStatus} />
      </div>
    </div>
  );
};
