import React, { useContext, useState } from "react";
import { useLoginUserMutation } from "../services/appApi";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const user = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({
      email: email,
      password: password,
    }).then(({ data }) => {
      if (data) {
        // console.log(data);
        socket.emit("new-user");
        navigate("/chat");
      }
    });
  };

  if (user) {
    navigate("/chat");
  }
  return (
    <>
      <Container>
        <Row>
          <Col md={6} className="login__bg"></Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            <Form
              style={{ width: "80%", maxWidth: 500 }}
              onSubmit={handleLogin}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <div className="py-4">
                <p className="text-center">
                  Don't have a account ?? <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
