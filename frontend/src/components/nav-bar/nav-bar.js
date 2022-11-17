import React from 'react'
import './nav-bar.css'

export const NavBar = () => {
  return (
    <div class='navbar-container'>
        {/* TODO: make it more elegant by making a search button and when pressing it it opens an input nicely */}
        <input class='search-bar'></input>
        <button class='search-button'>Search</button>
    </div>
    
  )
}
