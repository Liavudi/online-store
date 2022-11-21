import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import utils from '../../api/utils';
import '../items/items.css'

export const Search = () => {
    const [getSearchResults, setSearchResults] = useState([]);
    const params = useParams()
    
    useEffect(()=>{
        utils.getItemByKeyword(params.keyword).then(res => setSearchResults(res.data))
    }, [params.keyword])
    const navigate = useNavigate()
    const searchResultMap = getSearchResults.map((data, key) => {
        return (
          <div
            key={key}
            className="item"
            onClick={() => {
              navigate(`/item/${data._id.toString()}`, { replace: true });
            }}
          >
            <img className="image-size" src={data.image} />
            <label>{data.name}</label>
            <label className="item-description">{data.description}</label>
            <label>₪{data.price}</label>
          </div>
        );
    });
    

  return (
    <div className='items-container'>{searchResultMap}</div>
  )
}


export default Search