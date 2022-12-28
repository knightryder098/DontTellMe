import React, { useContext, useEffect } from "react";
import { ListGroup, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotification, resetNotification } from "../Functions/userSlice";
import "../css/sidebar.css";
function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    messages,
    setMessages,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  const joinRoom = (room, isPublic = true) => {
    if (!user) return alert("Please Login");

    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);
    if (isPublic) setPrivateMemberMsg(null);

    //notifications
    dispatch(resetNotification(room));
  };

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) dispatch(addNotification(room));
  });

  // eslint-disable-next-line no-use-before-define
  useEffect(() => { // eslint-disable-next-line no-use-before-define
    if (user) { // eslint-disable-next-line no-use-before-define
      setCurrentRoom("general"); // eslint-disable-next-line no-use-before-define
      getRoom();// eslint-disable-next-line no-use-before-define
      getMessage()// eslint-disable-next-line no-use-before-define
      socket.emit("join-room", "general");// eslint-disable-next-line no-use-before-define
      socket.emit("new-user");// eslint-disable-next-line no-use-before-define
    }// eslint-disable-next-line no-use-before-define
  }, []); // eslint-disable-next-line no-use-before-define
// eslint-disable-next-line no-use-before-define
  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  const getMessage=()=>{
    setMessages(messages)
  }
  const getRoom = () => {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  const orderId = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  const handleMemberMSG = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderId(user._id, member._id);
    joinRoom(roomId, false);
  };
  return (
    <>
      <h1>Public Rooms</h1>
      <ListGroup>
        {rooms.map((room, id) => (
          <ListGroup.Item
            key={id}
            onClick={() => joinRoom(room)}
            active={room === currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {room}
            {currentRoom !== room && (
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[room]}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h1>Members</h1>
      <ListGroup>
        {members.map((member) => (
          <ListGroup.Item
            key={member.id}
            style={{ cursor: "pointer" }}
            active={privateMemberMsg?._id === member?._id}
            onClick={() => handleMemberMSG(member)}
            disabled={member._id === user._id}
          >
            <Row>
              <Col xs={2} className="member-status">
                <img
                  src={member.imageslink}
                  className="member-status-img"
                  alt="chat-profile-art"
                />
                {member.status === "online" ? (
                  <i className="fas fas-circle sidebar-online-status"></i>
                ) : (
                  <i className="fas fas-circle sidebar-offline-status"></i>
                )}
              </Col>
              <Col xs={9}>
                {member.username}
                {member._id === user?._id && " (You)"}
                {member._id === "offline" && " (Offline)"}
              </Col>
              <Col xs={1}>
                <span className="badge rounded-pill bg-primary">
                  {user.newMessages[orderId(member._id, user._id)]}
                </span>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
