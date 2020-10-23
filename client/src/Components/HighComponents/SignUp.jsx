import React from "react";
import axios from "axios";
import image from "../../Assets/Images/home.jpg";
import { Button, Container, Row, Col, Form, Image } from "react-bootstrap";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    checkPass: "",
    passwordErr: false,
    userExist: false
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password, checkPass } = this.state;

    if(checkPass === password){
      const user = {
        email,
        password,
      };
  
      axios
        .post("http://localhost:5000/signup", user)
        .then((res) => console.log(res))
        .catch((err) => {
          console.error(err);
        });
    }
    else
     this.setState( prevState =>({
       passwordErr: !prevState.passwordErr
     }))
  };

  render() {
    const { checkPass, email, password } = this.state;
    console.log(this.state)
    return (
      <div className="signup">
        <Container className="p-5 bg-light" style={{ marginTop: 150 }}>
          <Row>
            <Col>
              <Image src={image} rounded />
            </Col>

            <Col>
              <Form bg="light">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group controlId="formRepeatPassword">
                  <Form.Label>Repeat password</Form.Label>
                  <Form.Control
                    name="checkPass"
                    type="password"
                    value={checkPass}
                    onChange={this.handleChange}
                    placeholder="Repeat password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SignUp;
