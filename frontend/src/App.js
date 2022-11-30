import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chat from "./Pages/Chat";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <>
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
    </>
  );
}

export default App;
