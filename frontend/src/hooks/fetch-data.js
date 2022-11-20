import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { increment, initiateState } from "../App/item-catalog-slice";
import axios from "axios";

const FetchNewData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/items",
    }).then((response) => {
      dispatch(initiateState());
      for (var i = 0; i < response.data.length; i++) {
        dispatch(increment());
      }
    });
  });
};

export default FetchNewData;