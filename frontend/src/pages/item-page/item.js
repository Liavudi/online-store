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
        <img className="image-size" src={itemDetails.image} />
        <label>{itemDetails.name}</label>

        <label className='description'>{itemDetails.description}</label>

        <label>₪{itemDetails.price}</label>
      </div>
    </div>
  );
};

export default Item;
