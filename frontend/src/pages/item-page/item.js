import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import utils from "../../api/utils";

export const Item = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const params = useParams();
  useEffect(() => {
    utils.getItemById(params.id).then((res) => setItemDetails(res.data));
  }, []);

  return <div>{itemDetails.description}</div>;
};

export default Item;
