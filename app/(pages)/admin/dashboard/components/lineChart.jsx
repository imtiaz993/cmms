import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ data, months }) => {
  const options = {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: months,
    },
    stroke: {
      width: 2,
    },
    markers: {
      size: 8,
    },
    colors: ["#2ECC71", "#E74C3C"], // Green & Red
    legend: {
      position: "bottom",
      itemMargin: {
        horizontal: 40,
        vertical: 20,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: document.body.classList.contains("dark-mode") ? "dark" : "light",
    },
    grid: {
      show: true, // Show grid
      borderColor: "#B1B1B1", // Grid color
      strokeDashArray: 1000, // Dashed lines
      xaxis: {
        lines: {
          show: true, // Enable vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Disable horizontal grid lines
        },
      },
    },
  };

  const series = [
    {
      name: data[0].name,
      data: data[0].data,
    },
    {
      name: data[1].name,
      data: data[1].data,
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default LineChart;
