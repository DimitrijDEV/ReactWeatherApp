import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Actions";

const Header = ({ authentication, dispatch }) => {
  console.log(authentication);

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
    return (
      <div className="header bg-dark p-3" style={{ fontSize: 20 }}>
        <Container>
          <Row>
            <Col sm={8}>
              <Link className="text-light p-2" to="/weather">
                WeatherApp
              </Link>
            </Col>

            <Col sm={4} className="text-right">
              <Link className="text-light p-2" to="#" onClick={() => dispatch(logout())}>
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
