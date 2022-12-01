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
    <div className="home container mt-3">
      {/* boton categorias */}

      <div className="row">
        <div className="col-12 col-lg-3">
          <aside>
            <h5>Select Category</h5>
            {categories.map((category) => (
              <div key={category.id}>
                <Button
                variant="outline"
                className="border border-0"
                  onClick={() => dispatch(filterProductThunk(category.id))}
                >
                  {category.name}
                </Button>
              </div>
            ))}
          </aside>
        </div>


        
        <div className="col-12 col-lg-9">
          {/* input para buscar por nombre */}
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <Button
              onClick={() => dispatch(filterProductNameThunk(inputSearch))}
            >
              Search
            </Button>
          </InputGroup>
          </div>
          </div>

          {/* info para las cards */}
          <div className="row">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4  mb-3" key={product.id}>
            <Card className="p-1" style={{ height: "23rem"}}>
              <Link className="text-decoration-none text-center text-reset" to={`/products/${product.id}`}>
                <Card.Img
                  variant="top"
                  src={product.productImgs[0]}
                  className="img-card my-3"
                />
                <Card.Body  className="text-decoration-none">
                  <Card.Title className="text-decoration-none">{product?.title}</Card.Title>
                  <Card.Text>
                    <p class="text-start"><span className="text-muted">Price</span><br />{product.price}</p>
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
