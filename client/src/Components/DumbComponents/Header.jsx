import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, removeCities } from "../../Actions";

const Header = ({ authentication, dispatch }) => {
 
  const logoutUser = () =>{
    dispatch(logout())
    dispatch(removeCities())
  }

  if (authentication.logged === false) {
    return (
      <div className="header bg-dark p-3" style={{ fontSize: 20 }}>
        <Container>
          <Row>
            <Col sm={8}>
              <Link className="text-light p-2" to="/">
                WeatherApp
              </Link>
            </Col>

            <Col sm={2} className="text-center">
              <Link className="text-light p-2" to="/login">
                Login
              </Link>
            </Col>

            <Col sm={2} className="text-center">
              <Link className="text-light p-2" to="/signup">
                SignUp
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {

    const {username} =  authentication;

    return (
      <div className="header bg-dark p-3" style={{ fontSize: 20 }}>
        <Container>
          <Row>
            <Col sm={8}>
              <Link className="text-light p-2" to="/weather">
                WeatherApp
              </Link>
            </Col>

            <Col sm={2} className="text-right">
              <Link className="text-light p-2" to="#">
                  {username.charAt(0).toUpperCase() + username.slice(1)}
              </Link>
            </Col>

            <Col sm={2} className="text-right">
              <Link className="text-light p-2" to="#" onClick={logoutUser}>
                  Logout
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps)(Header);
