import React from "react";

import image from "../../Assets/Images/home.jpg";
import { Button, Container, Row, Col, Form, Image } from "react-bootstrap";

class Login extends React.Component {

render(){
    return (
        <div className="login">
          <Container className = "p-5 bg-light" style={{marginTop: 150}}>
            <Row>
              <Col>
                <Image src={image} rounded />
              </Col>
    
              <Col>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
    
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
    
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      );
}
};

export default Login;


  