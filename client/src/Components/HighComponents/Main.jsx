import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserCities } from "../../Actions";
import { writeCities } from "../../Actions";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Spinner,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import "../../Assets/CSS/Main.css";

class Main extends React.Component {
  componentDidMount() {
    const { dispatch, citiesApi } = this.props;

    if (citiesApi.length === 0) {
      axios
        .get("http://localhost:5000/cities")
        .then((res) => {
          dispatch(writeCities(res.data));
        })
        .catch((err) => {
          console.error(err);
        });

        const interval = setInterval(() => {
          this.getCity(756135);
        }, 60000);

        this.getCity(756135);
        this.setState({ intervalID: interval });
    }
  }

  state = {
    cityID: "756135",
    search: "",
    userCity: { id: "", name: "" },
    foundCity: { id: "", name: "" },
    city: {
      name: "",
      temp: "",
      humidity: "",
      wind: "",
      desc: "",
    },
    foundCities: [],
    intervalID: "",
  };

  handleSelect = (event) => {
    const city = { id: event.target.id, name: event.target.value };
    this.setState({ [event.target.className]: city });
  };

  handleChange = (event) => {
    if (event.target.value.length < 50)
      this.setState({ [event.target.name]: event.target.value });
  };

  handleSearch = (event) => {
    event.preventDefault();
    const { search } = this.state,
      { citiesApi } = this.props;

    if (search.length >= 3) {
      let filteredArr = citiesApi.filter((city) =>
        city.name.toLowerCase().includes(search)
      );

      this.setState({ foundCities: filteredArr });
    }
  };

  addTown = (event) => {
    event.preventDefault();
    const cityID = this.state.foundCity.id,
      cityName = this.state.foundCity.name,
      { authentication, dispatch } = this.props;

    if (cityName.length > 0 && cityID.length > 0) {
      const params = {
        userID: authentication.id,
        password: authentication.password,
        cityID,
        cityName,
      };

      axios
        .post("http://localhost:5000/add-city", params)
        .then((res) => {
          if (res.data.length > 0) {
            dispatch(getUserCities(res.data));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  removeTown = (event) => {
    event.preventDefault();
    const cityID = this.state.userCity.id,
      { authentication, dispatch, citiesUser } = this.props;

    if (cityID.length > 0) {
      const params = {
        userID: authentication.id,
        password: authentication.password,
        cityID,
      };

      const foundCity = citiesUser.find((city) => city.id === cityID);

      if (foundCity !== undefined) {
        axios
          .post("http://localhost:5000/remove-city", params)
          .then((res) => {
            dispatch(getUserCities(res.data));
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  showCity = () => {
    const { id } = this.state.userCity;
    const interval = setInterval(() => {
      this.getCity(id);
    }, 60000);

    if (id.length > 0) {
      clearInterval(this.state.intervalID);

      this.getCity(id);
      this.setState({ cityID: id, intervalID: interval });
    }
  };

  getCity = (cityID) => {
    const key = "6064dfa2d2b9d50fb77e84a7e6d95410";

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?id=" +
        cityID +
        "&appid=" +
        key
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        let name = "",
          humidity = "",
          wind = "",
          temp = "",
          desc = "";

        console.log(data);

        if (data.main !== undefined) {
          name = data.name;
          humidity = data.main.humidity;
          wind = Math.round(data.wind.speed);
          temp = Math.round(parseFloat(data.main.temp) - 273.15);
          desc = data.weather[0].main;

          this.setState({
            city: {
              name,
              humidity,
              wind,
              temp,
              desc,
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { search, foundCities, city } = this.state,
      { citiesApi, citiesUser, authentication } = this.props;

    if (authentication.logged === false) return <Redirect to="/login" />;

    if (citiesApi.length > 0) {
      return (
        <div className="main" style={{ marginTop: 100 }}>
          <Container className="bg-light">
            <Row className="first-block d-flex p-5 text-light">
              <Col sm={5} className="mt-4 ">
                <div className="d-flex  justify-content-center">
                  <h2 style={{ fontSize: 80 }}>{city.temp}</h2>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-circle"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                  </svg>
                </div>

                <div
                  className="d-flex  justify-content-center"
                  style={{ letterSpacing: 4, color: "black", opacity: 0.6 }}
                >
                  <h4 className="font-weight-bold">
                    {city.desc.toUpperCase()}
                  </h4>
                </div>

                <div className="d-flex  justify-content-center mt-4 text-center">
                  <div style={{ marginRight: 40 }}>
                    <h5 style={{ letterSpacing: 2 }}>HUMIDITY</h5>
                    <p>{city.humidity}%</p>
                  </div>
                  <div>
                    <h5 style={{ letterSpacing: 2 }}>WIND</h5>
                    <p>{city.wind} K/M</p>
                  </div>
                </div>
              </Col>
              <Col sm={7} className="mt-4">
                <div className="weather-city d-flex  justify-content-center">
                  <h4 style={{ fontSize: 40 }}>{city.name}</h4>
                </div>
              </Col>
            </Row>

            <Row className="p-3 pt-4">
              <Col className="list-block" sm={4}>
                <h4>My list:</h4>

                {citiesUser.length > 0 ? (
                  <div>
                    <Form>
                      <Form.Group controlId="exampleForm.SelectCustomHtmlSize">
                        <Form.Control as="select" htmlSize={10} custom>
                          {citiesUser.map((city, index) => {
                            return (
                              <option
                                className="userCity"
                                key={index}
                                id={city.id}
                                onClick={this.handleSelect}
                              >
                                {city.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    </Form>

                    <div className=" d-flex  justify-content-center">
                      <Button
                        className="mr-4"
                        variant="primary"
                        onClick={this.showCity}
                      >
                        Show
                      </Button>
                      <Button variant="danger" onClick={this.removeTown}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Alert variant="primary">
                      You need to find a town to display a list to add it to
                      your list
                    </Alert>
                  </div>
                )}
              </Col>
              <Col sm={8}>
                <h4>Find a city</h4>

                <div className="input-group mb-3">
                  <input
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="You need type minimum 3 symbols..."
                    value={search}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <Button variant="primary" onClick={this.handleSearch}>
                      Search
                    </Button>
                  </div>
                </div>

                {foundCities.length > 0 ? (
                  <div>
                    <Form>
                      <Form.Group controlId="exampleForm.SelectCustomHtmlSize">
                        <Form.Control as="select" htmlSize={7} custom>
                          {foundCities.map((city, index) => {
                            return (
                              <option
                                className="foundCity"
                                key={index}
                                id={city.id}
                                onClick={this.handleSelect}
                              >
                                {city.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    </Form>

                    <Button
                      className="w-100 "
                      variant="success"
                      onClick={this.addTown}
                    >
                      Add
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Alert variant="primary">
                      You need to type something if you want to find a city
                    </Alert>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <Container
          className="d-flex justify-content-center"
          style={{ marginTop: 250 }}
        >
          <Spinner animation="border" role="status" variant="light">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  authentication: state.authentication,
  citiesApi: state.citiesApi,
  citiesUser: state.citiesUser,
});

export default connect(mapStateToProps)(Main);

// <div className="main" style={{ marginTop: 150 }}>
// <div className="wrapper">
//   <div className="left-block">
//     <Image
//       src={require("../../Assets/Images/autumn.jpg")}
//       alt="Warsaw"
//     />
//   </div>
//   <div className="right-block">
//     <div className="list-cities">
//       <Form>
//         <Form.Group controlId="exampleForm.SelectCustom">
//           <Form.Label>Custom select</Form.Label>
//           <Form.Control as="select" custom>
//             <option>1</option>
//             <option>2</option>
//             <option>3</option>
//             <option>4</option>
//             <option>5</option>
//           </Form.Control>
//         </Form.Group>
//       </Form>
//     </div>
//   </div>
// </div>
// </div>

// const key = "6064dfa2d2b9d50fb77e84a7e6d95410",
//   cityID = "2172797";

// fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)
// .then(function(resp) { return resp.json() })
// .then(function(data) {
//   console.log(data);
// })
