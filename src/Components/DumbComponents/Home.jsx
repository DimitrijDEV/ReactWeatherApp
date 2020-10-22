import React from "react";

import { Container, Row, Col} from "react-bootstrap";

const Home = () => {
  return (
    <div className="home" style={{marginTop: 150}}>
      <Container className = "p-3">
        <Row>
          <Col className="text-center text-light">
            <h1>Welcome To Weather App</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
