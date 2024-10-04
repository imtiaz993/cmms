import Link from "next/link";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => (
  <ReactApexChart
    series={[44, 20, 3]}
    options={{
      chart: {
        width: 380,
        type: "donut",
      },
      labels: ["Completed", "Open", "Past Due"],
      colors: ["#009E60", "#40E0D0", "#FFC300"],
      dataLabels: {
        enabled: true,
        formatter: function (_, opt) {
          return opt.w.config.series[opt.seriesIndex];
        },
      },
      stroke: {
        show: false,
        width: 0,
      },
      legend: {
        position: "right",
        fontSize: "14px",
        fontWeight: "400",
        labels: {
          colors: ["#fff", "#fff", "#fff"],
        },
        markers: {
          offsetX: -5,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 20,
        },
      },
      responsive: [
        {
          breakpoint: 1150,
          options: {
            chart: {
              width: 320,
            },
            legend: {
              position: "bottom",
              itemMargin: {
                horizontal: 10,
                vertical: 10,
              },
            },
          },
        },
        {
          breakpoint: 500,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              fontSize: "12px",
            },
          },
        },
      ],
    }}
    type="donut"
    width={380}
  />
);

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
          colors: ["#fff", "#fff", "#fff"],
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
            colors: "#FFF",
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
            colors: "#FFF",
          },
        },
      },

      tooltip: {
        theme: "dark",
      },
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              width: 400,
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
          breakpoint: 1150,
          options: {
            chart: {
              width: 320,
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
    width={500}
    height={350}
  />
);

const Dashboard = ({ activeLocation }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-8 pb-4 pt-3">
      <Card
        loading={false}
        className="!bg-primary"
        title={
          <p className="text-sm md:text-base">
            Unplanned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 30 days)</sup>
          </p>
        }
        extra={
          <Link
            href={`/admin/dashboard?tab=work-orders&location=${activeLocation}`}
            className="cursor-pointer text-secondary text-xs md:text-sm"
          >
            View All
          </Link>
        }
      >
        <div className="flex justify-center">
          <DonutChart />
        </div>
      </Card>
      <Card
        loading={false}
        className="!bg-primary"
        title={
          <p className="text-sm md:text-base">
            Planned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 30 days)</sup>
          </p>
        }
        extra={
          <Link
            href={`/admin/dashboard?tab=work-orders&location=${activeLocation}`}
            className="cursor-pointer text-secondary text-xs md:text-sm"
          >
            View All
          </Link>
        }
      >
        <div className="flex justify-center">
          <DonutChart />
        </div>
      </Card>
      <Card
        loading={false}
        className="!bg-primary"
        title={
          <p className="text-sm md:text-base">
            Unplanned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 3 months)</sup>
          </p>
        }
      >
        <div className="flex justify-center">
          <ColumnChart />
        </div>
      </Card>
      <Card
        loading={false}
        className="!bg-primary"
        title={
          <p className="text-sm md:text-base">
            Planned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 3 months)</sup>
          </p>
        }
      >
        <div className="flex justify-center">
          <ColumnChart />
        </div>
      </Card>
      <Card
        loading={false}
        className="!bg-primary"
        title={<p className="text-sm md:text-base">Projected Man Hours</p>}
        extra={
          <Link
            href={`/admin/dashboard?tab=schedule&location=${activeLocation}`}
            className="cursor-pointer text-secondary text-xs md:text-sm"
          >
            View Schdeule
          </Link>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        className="!bg-primary"
        title={<p className="text-sm md:text-base">Asset Downtime</p>}
      >
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default Dashboard;
