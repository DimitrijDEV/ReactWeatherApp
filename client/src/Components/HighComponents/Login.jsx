import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { login, getUserCities } from "../../Actions";
import image from "../../Assets/Images/home.jpg";
import { Redirect } from "react-router-dom";
import { Button, Container, Row, Col, Form, Image } from "react-bootstrap";

class Login extends React.Component {
  _isMounted = false;

  state = {
    email: "",
    password: "",
    userExist: true,
    passwordCorrect: true,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { dispatch } = this.props;

    const user = {
      email,
      password,
    };

    axios
      .post("http://localhost:5000/login", user)
      .then((res) => {
        const { userExist, passwordCorrect, id, username, password } = res.data;

        if (userExist === false || passwordCorrect === false) {
          this.setState({
            userExist,
            passwordCorrect,
          });
        }

        if (userExist && passwordCorrect) {
          dispatch(getUserCities(res.data.cities));
          dispatch(login(id, username, password));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const { email, password, passwordCorrect, userExist } = this.state;
    const { authentication } = this.props;

    if (authentication.logged) return <Redirect to="/main" />;

    return (
      <div className="login">
        <Container className="p-5 bg-light" style={{ marginTop: 150 }}>
          <Row>
            <Col>
              <Image src={image} rounded />
            </Col>

            <Col>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Enter email"
                  />
                  {userExist === false && (
                    <Form.Text className="text-danger">
                      You need to sign up
                    </Form.Text>
                  )}
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
                  {passwordCorrect === false && userExist !== false && (
                    <Form.Text className="text-danger">
                      Your password is incorect. Please try again.
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
  citiesApi: state.citiesApi,
});

export default connect(mapStateToProps)(Login);
