import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Messageform from "../Components/Messageform";
import Sidebar from "../Components/Sidebar";

function Chat() {
  return (
    <>
      <Container>
        <Row>
          <Col md={4}>
            <Sidebar />
          </Col>
          <Col md={8}>
            <Messageform />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Chat;
