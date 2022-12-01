import React, { useEffect } from 'react';
import { Button, Card, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { buyCartThunk, getCartThunk } from '../store/slices/cart.slice';

const Cart = ({show, handleClose}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    const cart = useSelector(state => state.cart)

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.map(product => (

<Card key={product.id} className="mb-3 ">
<Card.Header className='card-cart'>{product.createdAt}</Card.Header>
<Card.Body>
  <Card.Title>{product.title}</Card.Title>
  <Card.Text>
    Qty: {product.productsInCart.quantity} <br />
    Price: {product.price}
    
  </Card.Text>
  
</Card.Body>
</Card>
            

          ))}
          <Button onClick={() => dispatch(buyCartThunk())}>Buy!</Button>
        </Offcanvas.Body>

      </Offcanvas>
        </div>
    );
};

export default Cart;