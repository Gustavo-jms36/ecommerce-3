import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getProductsThunk } from "../store/slices/products.slice";

const Product = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const productsList = useSelector((state) => state.products);

  const products = productsList.find(
    (productList) => productList.id === Number(id)
  );

  const suggestProduct = productsList.filter(
    (productList) => productList.category.id === products.category.id
  );

  console.log(suggestProduct);

  return (
    <div>
      <h1>{products?.title}</h1>
      <img src={products?.productImgs[0]} alt="" />
      <h2>Suggest Products</h2>
      {suggestProduct.map((product) => (
        <ul key={product.id}>
        <li>
            <Link to={`/products/${product.id}`}>
            {product.title}
            </Link>
        </li>
        </ul>
      ))}
    </div>
  );
};

export default Product;
