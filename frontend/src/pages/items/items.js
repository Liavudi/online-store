import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Footer from '../../components/footer/footer';
import { NavBar } from '../../components/nav-bar/nav-bar';
import utils from '../../api/utils';


  


export default function Items() {
    const [allCategoryItems, setAllCategoryItems] = useState([])
    const params = useParams()
    
    useEffect(() => {
        utils.getItemsByCategory(params.category).then(res => setAllCategoryItems(res.data))
    },[])
    
    const categoryContent = allCategoryItems.map((data, key) => {
        return <img key={key} src={data.image}/>
        
    })
        


    return (
        <>
            <div className="all-content-but-footer">
            <NavBar />
            {categoryContent}
            </div>
            <Footer />
        </>
    )
}