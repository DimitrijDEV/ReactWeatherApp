import React from "react";
import { Row, Col } from "react-bootstrap";

const CityInfo = ({city}) => {

  const {name, temp, wind, humidity, desc }  = city;

  return (
    <Row className="first-block d-flex p-5 text-light">
      <Col sm={5} className="mt-4 ">
        <div className="d-flex  justify-content-center">
          <h2 style={{ fontSize: 80 }}>{temp}</h2>
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
          <h4 className="font-weight-bold">{desc.toUpperCase()}</h4>
        </div>

        <div className="d-flex  justify-content-center mt-4 text-center">
          <div style={{ marginRight: 40 }}>
            <h5 style={{ letterSpacing: 2 }}>HUMIDITY</h5>
            <p>{humidity}%</p>
          </div>
          <div>
            <h5 style={{ letterSpacing: 2 }}>WIND</h5>
            <p>{wind} K/M</p>
          </div>
        </div>
      </Col>
      <Col sm={7} className="mt-4">
        <div className="weather-city d-flex  justify-content-center">
          <h4 style={{ fontSize: 40 }}>{name}</h4>
        </div>
      </Col>
    </Row>
  );
};

export default CityInfo;
