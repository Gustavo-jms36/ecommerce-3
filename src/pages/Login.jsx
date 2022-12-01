import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    axios.post('https://e-commerce-api.academlo.tech/api/v1/users/login', data)
    .then(res => {
        navigate('/')
        console.log(res);
        localStorage.setItem('token', res.data.data.token)
    })
    .catch(error => {
        if (error.response?.status === 404) {
            alert("Credenciales incorrectas")
        } else {
            console.log(error.response?.data);
        }
    })
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center ">
        <div className="col-12 col-md-6 shadow p-3 mb-5 bg-body rounded">
          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
