import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProducts } from '../actions/productAction';

const ProductScreen = (props) => {
  const productDetails = useSelector((state) => state.productDetails);
  const [qty, setQty] = useState(1);
  const {product, loading, error} = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProducts(props.match.params.id));
    return () => {
      // cleanup
    }
  },[]);

  const handleAddToCart = () => {
    props.history.push("/cart/"+props.match.params.id + "?qty="+qty)
  }

  return <div>
    <div>
      <Link to="/" className="back-to-result">Back to result</Link>
    </div>
   
    {
      loading ? <div> Loading...</div>:
      error? <div> {error} </div>:
      (
        <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product" />
        </div>
        <div className="details-info">
          <ul>
            <li><h1>{product.name}</h1></li>
            <li>{product.rating} Stars ({product.numReviews}) Reviews</li>
            <li>Price: {product.price}</li>
            <li>Description:{product.description}</li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: {product.price}</li>
            <li>Status: {product.countInStock>0?"In Stock":"Unavailable" }</li>
            <li>Qty: <select value={qty} onChange={(e)=> {setQty(e.target.value)}}>
               {
               [...Array(product.countInStock).keys()].map(x=>
                  <option key={x+1} value={x+1}>{x+1}</option>
                )
                
                }
            </select>
             </li>

             <li>
               {product.countInStock>0 && (<button className="button primary" onClick={handleAddToCart}>Add to Cart</button>)}
              </li>
          </ul>
        </div>
      </div>
      
      )
    }
  </div>
}
export default ProductScreen;