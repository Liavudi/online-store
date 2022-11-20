import React from 'react'
import './nav-bar.css'

export const NavBar = () => {
  return (
    <div className='navbar-container'>
        {/* TODO: make it more elegant by making a search button and when pressing it it opens an input nicely */}
        <input className='search-bar'></input>
        <button className='search-button'>Search</button>
    </div>
    
  )
}
