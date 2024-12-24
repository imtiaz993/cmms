import ReactApexChart from "react-apexcharts";

const ColumnChart = ({ data }) => {
  // Extracting data from the provided object
  const { months, created, completed } = data;

  return (
    <ReactApexChart
      series={[
        {
          name: "Created",
          data: created,
        },
        {
          name: "Completed",
          data: completed,
        },
      ]}
      options={{
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        colors: ["#009E60", "#40E0D0"],
        legend: {
          fontSize: "14px",
          fontWeight: "400",
          labels: {
            colors: ["var(--text-color)", "var(--text-color)"],
          },
          markers: {
            offsetX: -5,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 10,
          },
        },
        grid: {
          show: false,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            endingShape: "rounded",
          },
        },
        stroke: {
          show: true,
          width: 10,
          colors: ["transparent"],
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
          categories: months, // Dynamically set categories
          crosshairs: {
            show: false,
          },
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
};

export default ColumnChart;
