import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterProductThunk,
  getProductsThunk,
  filterProductNameThunk,
} from "../store/slices/products.slice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, InputGroup, Form, Card } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  console.log(categories);

  return (
    <div className="home">
      {/* boton categorias */}
      <aside>
        <h5>Select Category</h5>
        {categories.map((category) => (
          <div key={category.id}>
            <Button onClick={() => dispatch(filterProductThunk(category.id))}>
              {category.name}
            </Button>
          </div>
        ))}
      </aside>

      <section className="prodructs">
        {/* input para buscar por nombre */}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => dispatch(filterProductNameThunk(inputSearch))}
          >
            Search
          </Button>
        </InputGroup>

        {/* info para las cards */}

        <Card>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>

        {products.map((product) => (
          <ul key={product.id}>
            <Link to={`/products/${product.id}`}>
              <li>
                {product?.title}
                <img src={product.productImgs[0]} alt="..." />
              </li>
            </Link>
          </ul>
        ))}
      </section>
    </div>
  );
};

export default Home;
