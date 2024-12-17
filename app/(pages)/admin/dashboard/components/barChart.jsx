import ReactApexChart from "react-apexcharts";

const BarChart = ({stats}) => (
  <ReactApexChart
    series={[
      {
        data: stats?.data,
      },
    ]}
    options={{
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: ["#40E0D0"],
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          style: {
            colors: "var(--text-color)",
          },
        },
        categories: stats?.categories,
      },
      yaxis: {
        labels: {
          style: {
            colors: "var(--text-color)",
          },
        },
      },
      tooltip: {
        theme: "dark",
      },
      responsive: [
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 370,
            },
            plotOptions: {
              bar: {
                columnWidth: "60%",
              },
            },
            stroke: {
              width: 5,
            },
          },
        },
        {
          breakpoint: 1500,
          options: {
            chart: {
              width: 310,
            },
          },
        },
        {
          breakpoint: 1280,
          options: {
            chart: {
              width: 500,
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 370,
            },
            legend: {
              fontSize: "12px",
            },
          },
        },
        {
          breakpoint: 430,
          options: {
            chart: {
              width: 300,
            },
          },
        },
      ],
    }}
    type="bar"
    width={400}
    height={350}
  />
);

export default BarChart;
