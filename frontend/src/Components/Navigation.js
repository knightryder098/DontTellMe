import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "../css/navigation.css";
function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);
    navigate("/");
  };
  return (
    <>
      <Navbar className="navbar-main" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} className="navbar_logo" alt="logo-main" />
              <span className="navbar_title"> Don't Tell me !!</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" sx={{color:"black"}} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <span className="navbar_links">
                      <LoginIcon
                        sx={{
                          fontSize: "inherit",
                          textAlign: "center",
                          margin: "0px 0px 2px 2px",
                          color: "blue",
                          paddingRight: "4px",
                        }}
                      />
                      Login
                    </span>
                  </Nav.Link>
                </LinkContainer>
              )}

              <div hidden={!user}>
                <LinkContainer to="/chat">
                  <Nav.Link>
                    <span className="navbar_links">chat</span>
                  </Nav.Link>
                </LinkContainer>
              </div>

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
                        alt="user-pic-circle-dropdown"
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
                  <NavDropdown.Item>
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
