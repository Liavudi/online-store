import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { NavBar } from "../../components/nav-bar/nav-bar";
import utils from "../../api/utils";
import './items.css'

export default function Items() {
  const [allCategoryItems, setAllCategoryItems] = useState([]);
  const params = useParams();

  useEffect(() => {
    utils
      .getItemsByCategory(params.category)
      .then((res) => setAllCategoryItems(res.data));
  }, []);

  const categoryContent = allCategoryItems.map((data, key) => {
    return (
      <div key={key} className='item'>
        <img className='image-size' src={data.image} />
        <label>{data.name}</label>
        <label className='item-description'>{data.description}</label>
        <label>₪{data.price}</label>
        
      </div>
    );
  });

  return (
    <>
      <div className="all-content-but-footer">
        <NavBar />
        <div className='items-container'>
            {categoryContent}
        </div>
      </div>
      <Footer />
    </>
  );
}
