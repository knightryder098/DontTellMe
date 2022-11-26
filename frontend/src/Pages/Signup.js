import React from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Signup.css";
import bot from '../assets/bot.jpg'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';

function Signup() {
  const validateImg=()=>{

  }
  return (
    <>
      <Container>
        <Row>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            <Form style={{ width:"80%", maxWidth:500 }}>
              <h1 className="text-center" >Create account</h1>
              <div className="sign_profile_pic_container">
                <img src={bot} className="signup_profile_pic" />
                <label htmlFor="image-upload" className="image-upload-label plus_profile_pic">
                <UploadRoundedIcon/>
                </label>
                <input type="file" id="image-upload" hidden accept="image/png,image/jpeg,image/jpg" onChange={validateImg} />
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>UserName</Form.Label>
                <Form.Control type="text" placeholder="Enter unique username" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Signup
              </Button>
              <div className="py-4">
                <p className="text-center">
                  Already have an account ?? <Link to="/login">Login</Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col md={6} className="signup__bg"></Col>
        </Row>
      </Container>
    </>
  );
}

export default Signup;
