"use client";
import Link from "next/link";
import { Card, message, Segmented } from "antd";
// import ReactApexChart from "react-apexcharts";
import { useSearchParams } from "next/navigation";
import Schedule from "./components/schedule";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import {
  getDashboardSchedule,
  getDashboardStats,
} from "app/services/dashboard";
const BarChart = dynamic(() => import("./components/barChart"), {
  ssr: false,
});
const ColumnChart = dynamic(() => import("./components/columnChart"), {
  ssr: false,
});

const Dashboard = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "rig-21";
  const activeSystem = searchParams.get("system") || "air-system";

  useEffect(() => {
    const getStats = async () => {
      const { status, data } = await getDashboardStats();
      if (status === 200) {
        console.log(data);
      } else {
        message.error(data?.message || "Failed to get stats");
      }
    };
    const getSchedule = async () => {
      const { status, data } = await getDashboardSchedule();
      if (status === 200) {
        console.log(data);
      } else {
        message.error(data?.message || "Failed to get schedule");
      }
    };
    getStats();
    getSchedule();
  }, []);

  return (
    <div className="flex flex-col gap-6 h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <div className="grid gap-6">
        <Card
          loading={false}
          className="!bg-primary"
          title={<p className="text-sm md:text-base">Schedule</p>}
          style={{ overflow: "hidden" }}
        >
          <div>
            <Schedule />
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
              href={`/admin/schedule?location=${activeLocation}&system=${activeSystem}`}
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
