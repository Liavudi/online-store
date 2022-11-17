import React from 'react'
import { useNavigate } from 'react-router-dom'
import './categories.css'


export default function Categories({category, imageUrl}) {
  const navigate = useNavigate();
  return (
        <div class='category-container' onClick={() => {navigate(`/${category}`)}}> 
        <img draggable="false" class='image-size' src={imageUrl} />
        <p>{category}</p>
        </div>
  )
}
