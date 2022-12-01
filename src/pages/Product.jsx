import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getProductsThunk } from "../store/slices/products.slice";
import { Button, Card } from "react-bootstrap";
import { addProductThunk } from "../store/slices/cart.slice";

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

  const [quantity, setQuantity] = useState("");

  const addCart = () => {
    const product = {
      id: products.id,
      quantity: quantity,
    };
    console.log(product);
    dispatch(addProductThunk(product));
  };

  return (
    <div className="container">
      <div className="row mt-5 align-items-center">
        <h1 className="fs-2 mb-5 text-center">{products?.title}</h1>
        <div className="col-12 col-md-6">
          <img src={products?.productImgs[0]} alt="" className="img-product" />
        </div>
        <div className="col-12 col-md-6">
          <p>{products?.description}</p>
          <input
            className="mb-3"
            type="text"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />{" "}
          <br />
          <Button onClick={addCart}>Add Cart</Button>
        </div>
        <h2 className="fs-2 text-center my-5 pt-5">Suggest Products</h2>
        <div className="row">
          {suggestProduct.map((product) => (
            <div className="col-12 col-sm-6 col-lg-4 mb-3" key={product.id}>
              <Card className="p- shadow p-3 mb-5 bg-body1" style={{ height: "20rem" }}>
                <Link
                  className="text-decoration-none text-center"
                  to={`/products/${product.id}`}
                >
                  <Card.Img
                    variant="top"
                    src={product.productImgs[0]}
                    className="img-card my-3"
                  />
                  <Card.Body className="text-decoration-none">
                    <Card.Title className="text-decoration-none">
                      {product?.title}
                    </Card.Title>
                    <Card.Text>
                      {/* Some quick example text to build on the card title and make
                  up the bulk of the card's content. */}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </div>

            // <ul key={product.id}>
            //   <li>
            //     <Link to={`/products/${product.id}`}>{product.title}</Link>
            //   </li>
            // </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
