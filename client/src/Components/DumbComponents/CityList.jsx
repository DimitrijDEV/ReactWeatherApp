import React from "react";
import { Form } from "react-bootstrap";

const CityList = ({ listSize, cities, selectName, func }) => {
  return (
    <Form>
      <Form.Group controlId="exampleForm.SelectCustomHtmlSize">
        <Form.Control as="select" htmlSize={listSize} custom>
          {cities.map((city, index) => {
            return (
              <option
                className={selectName}
                key={index}
                id={city.id}
                onClick={func}
              >
                {city.name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default CityList;
