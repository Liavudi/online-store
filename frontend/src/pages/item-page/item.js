import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import utils from "../../api/utils";
import "./item.css";

export const Item = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const params = useParams();
  useEffect(() => {
    utils.getItemById(params.id).then((res) => setItemDetails(res.data));
  }, []);

  return (
    <div className="container">
      <div className="item-container">
        <img draggable={false} className="image-size" src={itemDetails.image} />
        <label className='item-name'>{itemDetails.name}</label>
        <label className="description">{itemDetails.description}</label>
        <div className='item-order-options'>
          <button className='order-button'>Buy Now!</button>
          <button className='order-button'>Basket</button>
          <label>₪{itemDetails.price}</label>
        </div>
      </div>
    </div>
  );
};

export default Item;
