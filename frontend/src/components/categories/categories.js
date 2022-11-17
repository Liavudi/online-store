import React from 'react'
import './categories.css'

const categoriesList = [
    {imageUrl: 'https://www.ivory.co.il/files/catalog/org/1667983814g14Im.jpg', categoryName: 'Computers'},
    {imageUrl: 'https://www.ivory.co.il/files/catalog/org/1661683411y11Ln.jpg', categoryName: 'Phones'},
    {imageUrl: 'https://www.ivory.co.il/files/catalog/org/1666171331o31Vj.jpg', categoryName: 'Laptops'},
    {imageUrl: 'https://www.ivory.co.il/splendid_images/cache/files/catalog/reg/1550663499D99Qy___D!220X!.jpg', categoryName: 'Displays'},
    {imageUrl: 'https://www.ivory.co.il/splendid_images/cache/files/catalog/reg/1539006292a92Ms___D!220X!.jpg', categoryName: 'Graphic Cards'},
    {imageUrl: 'https://www.ivory.co.il/splendid_images/cache/files/catalog/reg/1657438284c84Pr___D!220X!.jpg', categoryName: 'Tvs'},
]

export default function Categories() {
  return (

    <div className='categories-container'>{categoriesList.map((data, key ) => 
        (<div className='category-container' key={key} > <img className='image-size' src={data.imageUrl} />{data.categoryName}</div>)
    )}</div>
  )
}
