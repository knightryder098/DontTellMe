import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chat from "./Pages/Chat";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";

function App() {
  const user = useSelector((state) => state.user);
  const [room, setRoom] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState([]);
  const [privateMessage, setPrivateMessage] = useState({});
  const [newMessage, setNewMessage] = useState({});
  return (
    <>
      <AppContext.Provider
        value={{
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
          newMessage,
          setNewMessage,
        }}
      >
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            {!user && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            {user && (
              <>
                <Route path="/chat" element={<Chat />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
