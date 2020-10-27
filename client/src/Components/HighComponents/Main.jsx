import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserCities, writeCities } from "../../Actions";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Alert,
  Form,
} from "react-bootstrap";
import "../../Assets/CSS/Main.css";
import CityInfo from "../DumbComponents/CityInfo";
import CityList from "../DumbComponents/CityList";
import LineChart from "../DumbComponents/LineChart";

class Main extends React.Component {
  componentDidMount() {
    const { dispatch, citiesApi, authentication } = this.props;
   
    if (citiesApi.length === 0 && authentication.logged) {
      axios
        .get("http://localhost:5000/cities")
        .then((res) => {
          dispatch(writeCities(res.data));
        })
        .catch((err) => {
          console.error(err);
        });

      const interval = setInterval(() => {
        this.getCity("756135", []);
      }, 60000);

      this.getCity("756135", []);
      this.setState({ intervalID: interval });
    }
  }

  state = {
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
    weekData: [],
    tempData: [],
    humidityData: [],
    foundCities: [],
    intervalID: "",
    showChart: false,
  };

  handleSelect = (event) => {
    const city = { id: event.target.id, name: event.target.value };
    this.setState({ [event.target.className]: city });
  };

  handleChange = (event) => {
    if (event.target.value.length < 50)
      this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck = (event) => {
    this.setState((prevState) => ({
      showChart: !prevState.showChart,
    }));
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
    const { cityName, cityID } = this.state.foundCity,
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
    const { id } = this.state.userCity,
      { citiesApi } = this.props;

    const interval = setInterval(() => {
      this.getCity(id, citiesApi);
    }, 60000);

    if (id.length > 0) {
      clearInterval(this.state.intervalID);

      this.getCity(id, citiesApi);
      this.setState({
        cityID: id,
        intervalID: interval,
      });
    }
  };

  getCity = (cityID, cities) => {
    const key = "6064dfa2d2b9d50fb77e84a7e6d95410";
    let foundCity = {};

    if (cities.length > 0) {
      foundCity = cities.find((city) => cityID === city.id.toString());
    } else {
      foundCity = { lat: "52.229771", lon: "21.01178" };
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${key}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("We got data from API");
        console.log(data);
        let name = "",
          humidity = "",
          wind = "",
          temp = "",
          desc = "";

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

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${foundCity.lat}&lon=${foundCity.lon}&exclude=minutely,hourly&appid=${key}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const { daily } = data,
          week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let weatherWeek = [],
          weatherTemp = [],
          weatherHumidity = [];

        for (let i = 0; i < daily.length; i++) {
          let unixTime = daily[i].dt,
            milliseconds = unixTime * 1000,
            dateObj = new Date(milliseconds),
            dayOfWeek = dateObj.getDay();

          weatherWeek.push(week[dayOfWeek]);
        }

        for (let i = 0; i < daily.length; i++) {
          let temp = Math.round(parseFloat(daily[i].temp.day) - 273.15);
          weatherTemp.push(temp);
        }

        for (let i = 0; i < daily.length; i++) {
          weatherHumidity.push(daily[i].humidity);
        }

        this.setState({
          weekData: weatherWeek,
          tempData: weatherTemp,
          humidityData: weatherHumidity,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
        search,
        foundCities,
        city,
        weekData,
        humidityData,
        tempData,
        showChart,
      } = this.state,
      { citiesApi, citiesUser, authentication } = this.props;

    if (authentication.logged === false) return <Redirect to="/login" />;

    if (citiesApi.length > 0) {
      return (
        <div className="main" style={{ marginTop: 80 }}>
          <Container className="bg-light">
            {showChart ? (
              <LineChart
                week={weekData}
                humidityData={humidityData}
                tempData={tempData}
              />
            ) : (
              <CityInfo city={city} />
            )}

            <Row className="p-3">
              <Col className="d-flex justify-content-end">
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Show Chart"
                    onClick={this.handleCheck}
                  />
                </Form>
              </Col>
            </Row>

            <Row className="p-3 pt-4">
              <Col className="list-block" sm={4}>
                <h4>My list:</h4>

                {citiesUser.length > 0 ? (
                  <div>
                    <CityList
                      listSize={10}
                      cities={citiesUser}
                      selectName="userCity"
                      func={this.handleSelect}
                    />

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
                    <CityList
                      listSize={7}
                      cities={foundCities}
                      selectName="foundCity"
                      func={this.handleSelect}
                    />

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
