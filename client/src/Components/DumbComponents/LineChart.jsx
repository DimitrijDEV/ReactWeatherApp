import React from "react";
import { Line } from "@reactchartjs/react-chart.js";
import { Row } from "react-bootstrap";
 

const LineChart = ({week, humidityData, tempData}) => {

  const data = {
    labels: week,
    datasets: [
      {
        label: 'Temperature',
        data: tempData,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Humidity',
        data: humidityData,
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-axis-2',
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  }

  return (
    <Row>
      <Line data={data} height={90} options={options} />
    </Row>
  );
};

export default LineChart;
