import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import utils from "../../api/utils";
import "./items.css";

export default function Items() {
  const [allCategoryItems, setAllCategoryItems] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    utils
      .getItemsByCategory(params.category)
      .then((res) => setAllCategoryItems(res.data));
  }, []);

  const categoryContent = allCategoryItems.map((data, key) => {
    return (
      <div
        key={key}
        className="item"
        onClick={() => {
          navigate(`/item/${data._id.toString()}`, { replace: true });
        }}
      >
        <img alt="" className="image-size" src={data.image} />
        <label>{data.name}</label>
        <label className="item-description">{data.description}</label>
        <label>₪{data.price}</label>
      </div>
    );
  });

  return <div className="items-container">{categoryContent}</div>;
}
