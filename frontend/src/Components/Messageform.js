import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import '../css/Messageform.css'
function Messageform() {
  const handleMessageSend = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="message_form"></div>
      <Form onSubmit={handleMessageSend}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type your message"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button variant="primary" type="submit">
              ↗️
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Messageform;
