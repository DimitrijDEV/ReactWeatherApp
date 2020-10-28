import React from "react";
import axios from "axios";
import image from "../../Assets/Images/home.jpg";
import { Button, Container, Row, Col, Form, Image } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class SignUp extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    checkPass: "",
    registered: false,
    passwordCorrect: true,
    passwordErr: false,
    userExist: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, username, password, checkPass } = this.state;
    let  emailRegEx = "", usernameRegEx = "" 

    usernameRegEx = username.replace(/\s+/g, "");
    emailRegEx = email.replace(/\s+/g, "");

    if (
      password.length >= 6 &&
      checkPass.length >= 6 &&
      checkPass === password &&
      usernameRegEx.length > 0 &&
      emailRegEx.length > 0
    ) {
      const user = {
        email: emailRegEx,
        username: usernameRegEx,
        password,
      };

      axios
        .post("http://localhost:5000/signup", user)
        .then((res) => {
          this.setState({
            email: "",
            password: "",
            checkPass: "",
            passwordCorrect: true,
            passwordErr: false,
            userExist: res.data.userExist,
            registered: res.data.userCreated,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (checkPass !== password)
      this.setState((prevState) => ({
        passwordCorrect: !prevState.passwordCorrect,
      }));

    if (password.length < 6 && checkPass.length < 6) {
      this.setState({ passwordErr: true });
    }
  };

  render() {
    const {
      checkPass,
      username,
      email,
      password,
      passwordCorrect,
      passwordErr,
      userExist,
      registered,
    } = this.state;

    const { authentication } = this.props;

    if (authentication.logged) return <Redirect to="/weather" />;

    if (registered) return <Redirect to="/login" />;

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
                  {userExist && (
                    <Form.Text className="text-danger">
                      You can't use this email twice
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    value={username}
                    onChange={this.handleChange}
                    placeholder="Type your username"
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

                {passwordErr && (
                  <Form.Text className="text-danger">
                    Your password must be at least 6 characters.
                  </Form.Text>
                )}

                <Form.Group controlId="formRepeatPassword">
                  <Form.Label>Repeat password</Form.Label>
                  <Form.Control
                    name="checkPass"
                    type="password"
                    value={checkPass}
                    onChange={this.handleChange}
                    placeholder="Repeat password"
                  />
                  {passwordCorrect === false && userExist === false && (
                    <Form.Text className="text-danger">
                      The password doesn't match
                    </Form.Text>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
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

const mapStateToProps = (state) => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps)(SignUp);
