import React from "react";
import { ListGroup } from "react-bootstrap";

function Sidebar() {
  const rooms = ["Discussion", "Tech", "Stock Market","Announchments"]
  return (
    <>
      <h1>Public Rooms</h1>
      <ListGroup>
        {rooms.map((room, id) => 
          <ListGroup.Item key={id}>{room}</ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
}

export default Sidebar;
