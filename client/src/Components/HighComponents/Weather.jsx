import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

class Weather extends React.Component {
  render() {
    const { authentication } = this.props;

    if(authentication.logged === false) 
      return <Redirect to='/login'/>;

    return (
      <div className="weather" style={{marginTop: 150}}>
        <Container>
          <Row>
            <Col className="text-center text-light">
              <h1>Welcome To Weather App</h1>
              <h2>Username: {authentication.username}</h2>
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

export default connect(mapStateToProps)(Weather);
