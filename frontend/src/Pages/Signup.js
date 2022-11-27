import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Signup.css";
import bot from "../assets/bot.jpg";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPicurl] = useState("");

  const [image, setImage] = useState(null);
  const [preViewImg, setPreviewImg] = useState(null);
  const [uploadImg, setUploadImg] = useState(false);

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Image size should be less than 1mb");
    } else {
      setImage(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const UploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wewzc2uw");
    try {
      setUploadImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dgbht4ypf/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadImg(false);
      return urlData.url;
    } catch (err) {
      setUploadImg(false);
      console.log(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please Upload a profile picture!!");
    const url = await UploadImage(image);
    setPicurl(url);
    console.log(url);
  };
  return (
    <>
      <Container>
        <Row>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            <Form
              style={{ width: "80%", maxWidth: 500 }}
              onSubmit={handleSignUp}
            >
              <h1 className="text-center">Create account</h1>
              <div className="sign_profile_pic_container">
                <img
                  src={preViewImg || bot}
                  className="signup_profile_pic"
                  alt="profile-pic"
                />
                <label
                  htmlFor="image-upload"
                  className="image-upload-label plus_profile_pic"
                >
                  <UploadRoundedIcon />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  hidden
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={validateImg}
                />
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter unique username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {uploadImg ? "Signing you up ..." : "Signup"}
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
