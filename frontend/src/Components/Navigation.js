import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useLogoutUserMutation} from '../services/appApi'
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../assets/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser]=useLogoutUserMutation()
  const navigate=useNavigate()
  const handleLogout=(e)=>{
    e.preventDefault();
    logoutUser(user);
    Navigate('/')
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                style={{ width: 75, height: 75, borderRadius: "50%" }}
                alt="logo"
              />
              Don't Tell me !!
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/chat">
                <Nav.Link>chat</Nav.Link>
              </LinkContainer>
              {user && (
                <NavDropdown
                  title={
                    <>
                      <img
                        src={user.imageslink}
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: 10,
                          textAlign: "center",
                        }}
                      />
                      {` ${user.firstname} `}
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.3">
                    <SettingsIcon sx={{ paddingRight: 0.25 }} />
                    Setting
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item >
                    <Button variant="danger" onClick={handleLogout}>
                      <LogoutIcon /> Logout
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
