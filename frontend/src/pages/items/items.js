import React from 'react'
import { useParams } from "react-router-dom";
import Footer from '../../components/footer/footer';
import { NavBar } from '../../components/nav-bar/nav-bar';

const categoriesList = [
    {id: 1, imageUrl: 'https://www.ivory.co.il/files/catalog/org/1667983814g14Im.jpg', categoryName: 'Computers'},
    {id: 2, imageUrl: 'https://www.ivory.co.il/files/catalog/org/1661683411y11Ln.jpg', categoryName: 'Phones'},
    {id: 3, imageUrl: 'https://www.ivory.co.il/files/catalog/org/1666171331o31Vj.jpg', categoryName: 'Laptops'},
    {id: 4, imageUrl: 'https://www.ivory.co.il/splendid_images/cache/files/catalog/reg/1550663499D99Qy___D!220X!.jpg', categoryName: 'Displays'},
    {id: 5,imageUrl: 'https://www.ivory.co.il/splendid_images/cache/files/catalog/reg/1539006292a92Ms___D!220X!.jpg', categoryName: 'Graphic Cards'},
    {id: 6, imageUrl: 'https://www.ivory.co.il/splendid_images/cache/files/catalog/reg/1657438284c84Pr___D!220X!.jpg', categoryName: 'Tvs'},
  ]
  


export default function Items() {
    const params = useParams()
    return (
        <>
            <div class="all-content-but-footer">
            <NavBar />
            {categoriesList.map(data => {
            if (data.categoryName === params.category){
                return <img src={data.imageUrl}/>
            }
            })}
            </div>
            <Footer />
        </>
    )
}