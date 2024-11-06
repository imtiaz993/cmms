import ReactApexChart from "react-apexcharts";

// const DonutChart = () => (
//   <ReactApexChart
//     series={[44, 20, 3]}
//     options={{
//       chart: {
//         width: 380,
//         type: "donut",
//       },
//       labels: ["Completed", "Open", "Past Due"],
//       colors: ["#009E60", "#40E0D0", "#FFC300"],
//       dataLabels: {
//         enabled: true,
//         formatter: function (_, opt) {
//           return opt.w.config.series[opt.seriesIndex];
//         },
//       },
//       stroke: {
//         show: false,
//         width: 0,
//       },
//       legend: {
//         position: "right",
//         fontSize: "14px",
//         fontWeight: "400",
//         labels: {
//           colors: ["#000", "#000", "#000"],
//         },
//         markers: {
//           offsetX: -5,
//         },
//         itemMargin: {
//           horizontal: 10,
//           vertical: 20,
//         },
//       },
//       responsive: [
//         {
//           breakpoint: 1150,
//           options: {
//             chart: {
//               width: 320,
//             },
//             legend: {
//               position: "bottom",
//               itemMargin: {
//                 horizontal: 10,
//                 vertical: 10,
//               },
//             },
//           },
//         },
//         {
//           breakpoint: 500,
//           options: {
//             chart: {
//               width: 300,
//             },
//             legend: {
//               fontSize: "12px",
//             },
//           },
//         },
//       ],
//     }}
//     type="donut"
//     width={380}
//   />
// );

const ColumnChart = () => (
  <ReactApexChart
    series={[
      {
        name: "Created",
        data: [76, 85, 101],
      },
      {
        name: "Completed",
        data: [44, 55, 57],
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
          colors: ["var(--text-color)", "var(--text-color)", "var(--text-color)"],
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
        categories: ["Feb", "Mar", "Apr"],
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

export default ColumnChart;
