import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slices";

const Purchases = () => {
  const dispatch = useDispatch();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My purchases</h2>
      <div className="row justify-content-center">
      {purchases.map((purchase) => (
        purchase.cart.products.map( product => (
          <div className="col-12 col-lg-8" key={product.id}>
            <Link className='text-reset text-decoration-none'  to={`/products/${product.id}`}>
            <Card  className="mb-3">
      <Card.Header>{product.createdAt}</Card.Header>
      <Card.Body className="border border-bottom">
        <div className="row">
            <div className="col-12 col-md-8">
        <Card.Title>{product.title}</Card.Title>
        </div>
        <div className="col-12 col-md-2">
        <Card.Text>
          {product.productsInCart.quantity}
        </Card.Text>
        </div>
        <div className="col-12 col-md-2">
        <p>{product.price}</p>
        </div>
      </div>
      </Card.Body>
    </Card>
    </Link>
    </div>
        ))
        
      ))}
      </div>
    </div>
  );
};

export default Purchases;
