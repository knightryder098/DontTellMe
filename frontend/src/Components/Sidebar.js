import { retry } from "@reduxjs/toolkit/dist/query";
import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const rooms = ["Discussion", "Tech", "Stock Market", "Announchments"];
  const {
    socket,
    room,
    setRoom,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    message,
    setMessage,
    privateMessage,
    setPrivateMessage,
  } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      setCurrentRoom(currentRoom);
      getRoom();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, [currentRoom]);
  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  const getRoom = () => {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRoom(data));
  };

  const joinRoom = (room, isPublic = true) => {
    
    if (!user) return alert("Please Login");

    socket.emit("join-room", room);
    setCurrentRoom(room);
    // alert(currentRoom)
    if (isPublic) setPrivateMessage(null);
  };

  const orderId=(id1,id2)=>{
    if(id1>id2)
    return id1+'-'+id2;
    else
    return id2+'-'+id1;
  }

  const handleMemberMSG = (member) => {
    setPrivateMessage(member);
    const roomId=orderId(user._id,member._id);
    joinRoom(roomId,false);
  };
  return (
    <>
      <h1>{currentRoom}</h1>
      <h1>Public Rooms</h1>
      <ListGroup>
        {room.map((room, id) => (
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
            {currentRoom !== room && <span>noti</span>}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h1>Members</h1>
      <ListGroup>
        {members.map((member) => (
          <ListGroup.Item
            key={member._id}
            style={{ cursor: "pointer" }}
            active={privateMessage?._id == member?._d}
            onClick={() => handleMemberMSG(member)}
            disabled={member._id == user._id}
          >
            {member.firstname}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
