import React, { useContext, useState, useEffect, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";

import "../css/Messageform.css";

function Messageform() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
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

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, date);
    setMessage("");
  };

  return (
    <>
      <div className="message_form">
        {user && !privateMemberMsg?._id && (
          <div className="alert alert-info">
            You are in the {currentRoom} room
          </div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div className="alert alert-info conversation-info">
              <div>
                Your conversation with {privateMemberMsg.username}
                <img
                  src={privateMemberMsg.imageslink}
                  className="conversation-profile-pic"
                  alt="private-member-art"
                />
              </div>
            </div>
          </>
        )}
        {user &&
          messages?.map(({ _id: date, messageByDate }, idx) => (
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
                    </div>
                    <p className="message-content">{content}</p>
                    <p className="message-timestamp-left">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>

      <Form onSubmit={handleMessageSend} className="message_typing_form" >
        <Row  className="message_input_field">
          <Col sm={11} className='message_form_send_text'>
            <Form.Group>
              <Form.Control
                type="text"
                disabled={!user}
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={1} className='message_form_send_button'>
            <Button variant="primary" type="submit" disabled={!user}>
              ↗️
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Messageform;
