import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { listProducts } from '../actions/productAction';

const HomeScreen = (props) => {

  const productList = useSelector((state)=> state.productList );
  const {products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      // cleanup
  }
  }, [])

  return loading? <div>Loading...</div>:
  error? <div>{error}</div>:
  <ul className="products">
  {
    products.map(product =>
      <li key={product._id}>
        <div className="product">
       <Link to={`/product/${product._id}`} ><img src={product.image} alt="product" className="product-image" /></Link>   
          <div className="product-name">
            <Link to={`/product/${product._id}`}>{product.name}</Link>

          </div>
          <div className="product-brane">{product.brand}</div>
          <div className="product-price">${product.price}</div>
          <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
        </div>
      </li>
    )
  }
</ul>
}
export default HomeScreen;