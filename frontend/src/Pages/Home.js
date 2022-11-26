import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import '../css/Home.css'
function Home() {
  return (
    <>
      <Row>
        <Col
          md={6}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        >
          <div>
            <h1>Have anonimoty while chatting</h1>
            <p>We dont save your messages after you logout.</p>
            <LinkContainer to="/login">
              <Button variant="success">Get Started !!</Button>
            </LinkContainer>
          </div>
        </Col>
        <Col md={6} className="home_bg"></Col>
      </Row>
    </>
  );
}

export default Home;
