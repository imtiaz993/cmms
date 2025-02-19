import ReactApexChart from "react-apexcharts";

const ColumnChart = ({ data }) => {
  // Extracting data from the provided object
  const { months, created, completed } = data;

  return (
    <ReactApexChart
      series={[
        {
          name: "Created",
          data: [3500, 2500, 2000, 3000, 3200, 3900],
        },
      ]}
      options={{
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        colors: ["#FBBF24"],
        legend: {
          fontSize: "14px",
          fontWeight: "400",
          labels: {
            colors: ["var(--primary-text)", "var(--primary-text)"],
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
            columnWidth: "15%",
          },
        },
        stroke: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          labels: {
            style: {
              colors: "var(--primary-text)",
            },
          },
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            // "July",
            // "Aug",
            // "Sep",
            // "Oct",
            // "Nov",
            // "Dec",
          ], // Dynamically set categories
          crosshairs: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "var(--primary-text)",
            },
          },
        },
        tooltip: {
          theme: "dark",
        },
        // responsive: [
        //   {
        //     breakpoint: 1600,
        //     options: {
        //       chart: {
        //         width: 370,
        //       },
        //       plotOptions: {
        //         bar: {
        //           columnWidth: "60%",
        //         },
        //       },
        //       stroke: {
        //         width: 5,
        //       },
        //     },
        //   },
        //   {
        //     breakpoint: 1500,
        //     options: {
        //       chart: {
        //         width: 310,
        //       },
        //     },
        //   },
        //   {
        //     breakpoint: 1280,
        //     options: {
        //       chart: {
        //         width: 500,
        //       },
        //     },
        //   },
        //   {
        //     breakpoint: 768,
        //     options: {
        //       chart: {
        //         width: 370,
        //       },
        //       legend: {
        //         fontSize: "12px",
        //       },
        //     },
        //   },
        //   {
        //     breakpoint: 430,
        //     options: {
        //       chart: {
        //         width: 300,
        //       },
        //     },
        //   },
        // ],
      }}
      type="bar"
      width={"100%"}
      height={350}
    />
  );
};

export default ColumnChart;
