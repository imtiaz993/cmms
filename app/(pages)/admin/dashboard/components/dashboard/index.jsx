import Link from "next/link";
import { Card, Segmented, Table } from "antd";
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

const BarChart = () => (
  <ReactApexChart
    series={[
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100],
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
            colors: "#FFF",
          },
        },
        categories: [
          "Motorman",
          "Floorman",
          "MUD PUMP INSP.",
          "Driller",
          "Rig Manager",
          "Tool Pusher",
          "Derrickman",
          "Third Party",
        ],
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

const unplannedColumns = [
  {
    title: "Asset Desc.",
    dataIndex: "assetDesc",
  },
  {
    title: "Asset #",
    dataIndex: "assetNo",
  },
  {
    title: "Date Performed",
    dataIndex: "datePerformed",
  },
  {
    title: "performed by",
    dataIndex: "performedBy",
  },
];

const unplannedData = [
  {
    assetDesc: "UWO016696000001",
    assetNo: "20-1384-13-07M",
    datePerformed: "Feb 22, 2022",
    performedBy: "John Doe",
  },

  {
    assetDesc: "UWO016696000002",
    assetNo: "20-1384-13-07M",
    datePerformed: "Feb 23, 2022",
    performedBy: "John Doe",
  },

  {
    assetDesc: "UWO016696000003",
    assetNo: "20-1384-13-07M",
    datePerformed: "Feb 24, 2022",
    performedBy: "John Doe",
  },

  {
    assetDesc: "UWO016696000004",
    assetNo: "20-1384-13-07M",
    datePerformed: "Feb 25, 2022",
    performedBy: "John Doe",
  },

  {
    assetDesc: "UWO016696000005",
    assetNo: "20-1384-13-07M",
    datePerformed: "Feb 26, 2022",
    performedBy: "John Doe",
  },
];

const plannedColumns = [
  {
    title: "Asset Desc.",
    dataIndex: "assetDesc",
  },
  {
    title: "Asset #",
    dataIndex: "assetNo",
  },
  {
    title: "Date Performed",
    dataIndex: "datePerformed",
  },
  {
    title: "performed by",
    dataIndex: "performedBy",
  },
];

const plannedData = [
  {
    assetDesc: "PWO013940000220",
    assetNo: "Z013-01",
    datePerformed: "2022-09-21",
    performedBy: "John Doe",
  },

  {
    assetDesc: "PWO013940000221",
    assetNo: "Z013-01",
    datePerformed: "2022-09-21",
    performedBy: "John Doe",
  },

  {
    assetDesc: "PWO013940000222",
    assetNo: "Z013-01",
    datePerformed: "2022-09-22",
    performedBy: "John Doe",
  },

  {
    assetDesc: "PWO013940000223",
    assetNo: "Z013-01",
    datePerformed: "2022-09-23",
    performedBy: "John Doe",
  },

  {
    assetDesc: "PWO013940000224",
    assetNo: "Z013-01",
    datePerformed: "2022-09-24",
    performedBy: "John Doe",
  },
];

const Dashboard = ({ activeLocation }) => {
  return (
    <div className="flex flex-col gap-6 h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-8 pb-4 pt-3">
      <div className="grid gap-6">
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
          <div className="grid md:grid-cols-2">
            <div className="flex justify-center">
              <DonutChart />
            </div>
            <Table
              loading={false}
              size={"small"}
              columns={unplannedColumns}
              dataSource={unplannedData}
              pagination={false}
              style={{
                overflow: "auto",
              }}
            />
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
          <div className="grid md:grid-cols-2">
            <div className="flex justify-center">
              <DonutChart />
            </div>
            <Table
              loading={false}
              size={"small"}
              columns={plannedColumns}
              dataSource={plannedData}
              pagination={false}
              style={{
                overflow: "auto",
              }}
            />
          </div>
        </Card>
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
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
          <div className="flex justify-center">
            <Segmented
              options={["30 Days", "60 Days", "90 Days"]}
              defaultValue="30 Days"
              className="!bg-[#212020]"
              onChange={(value) => {
                // TODO: Change chart data
              }}
            />
          </div>
          <div className="flex justify-center">
            <BarChart />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
