import React, { useContext, useState, useEffect, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";

import "../css/Messageform.css";

function Messageform() {
  const [messages, setMessages] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, message, setMessage, privateMessage, currentRoom } =
    useContext(AppContext);

  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFormatedDate = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDay();
    day = day.length > 1 ? day : "0" + day;
    return month + "/" + day + "/" + year;
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const date = getFormatedDate();

  socket.off("room-messages").on("room-messages", (roomMessage) => {
    setMessage(roomMessage);
  });

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (!messages) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, messages, user, time, date);
    setMessages("");
  };

  return (
    <>
      <div className="message_form">
        {user && privateMessage?._id && (
          <>
            <div className="alert alert-info conversation-info">
              <div>
                Your conversation with {privateMessage.username}
                <img
                  src={privateMessage.imageslink}
                  className="conversation-profile-pic"
                  alt="private-member-art"
                />
              </div>
            </div>
          </>
        )}
        {user &&
          message?.map(({ _id: date, messageByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center message-date-indicator">
                {date}
              </p>
              {messageByDate?.map(({ content, time, from: sender }, idx) => (
                <div
                  key={idx}
                  className={
                    sender?.email === user?.email
                      ? "message"
                      : "incoming-message"
                  }
                >
                  <div className="message-inner">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={sender.imageslink}
                        style={{
                          width: 35,
                          height: 35,
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginRight: 10,
                        }}
                        alt="sender-im-art"
                      />
                      <p className="message-sender">
                        {sender._id === user?._id ? "You" : sender.username}
                      </p>
                      <p className="message-content">{content}</p>
                      <p className="message-timestamp-left">{time}</p>
                    </div>
                  </div>
                </div>
              ))}
      
            </div>
          ))}
          <div ref={messageEndRef}/>
      </div>

      <Form onSubmit={handleMessageSend}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                disabled={!user}
                placeholder="Type your message"
                value={messages}
                onChange={(e) => setMessages(e.target.value)}
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
