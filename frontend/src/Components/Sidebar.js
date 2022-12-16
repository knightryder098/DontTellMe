import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function Sidebar() {
  const user=useSelector((state)=>state.user)
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

  useEffect(()=>{
    if(user){
      setCurrentRoom('general');
      getRoom();
      socket.emit('join-room','general');
      socket.emit('new-user');
    }
  },[])
  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  const getRoom = () => {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRoom(data));
  };

  return (
    <>
      <h1>Public Rooms</h1>
      <ListGroup>
        {room.map((room, id) => (
          <ListGroup.Item key={id}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h1>Members</h1>
      <ListGroup>
        {members.map((member) => (
          <ListGroup.Item key={member._id} style={{ cursor: "pointer" }}>
            {member.firstname}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
