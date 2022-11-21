import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./nav-bar.css";
import utils from "../../api/utils";

export const NavBar = () => {
  
  const [getInputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      {/* TODO: make it more elegant by making a search button and when pressing it it opens an input nicely */}
      <div className='search-components'>

      <input
        className="search-bar" type='text'
        onChange={(res) => setInputValue(res.target.value)}
        ></input>
      <button
        className="search-button"
        onClick={() => {
          if (getInputValue.length != 0){
            navigate(`/search/${getInputValue}`);
            
          }
        }}
        >
        Search
      </button>
        </div>
    </div>
  );
};
