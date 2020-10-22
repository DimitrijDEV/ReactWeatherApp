import React from "react";
import { Container, Row, Col} from "react-bootstrap";

import { Link } from "react-router-dom";

const Header = () => {
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
};

export default Header;

 
