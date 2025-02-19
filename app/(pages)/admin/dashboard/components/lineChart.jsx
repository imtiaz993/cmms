import React from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const options = {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
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
      theme: "dark",
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
      name: "Planned",
      data: [12, 10, 16, 9, 10], // Sample Data
    },
    {
      name: "Unplanned",
      data: [10, 12, 9, 11, 8], // Sample Data
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default LineChart;
