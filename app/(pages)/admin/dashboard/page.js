"use client";
import Link from "next/link";
import { Card, message, Segmented } from "antd";
// import ReactApexChart from "react-apexcharts";
import { useSearchParams } from "next/navigation";
import Schedule from "./components/schedule";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
  const [schedule, setSchedule] = useState();
  const [stats, setStats] = useState();
  const [selectedRange, setSelectedRange] = useState("30Days"); // Default to 30Days

  useEffect(() => {
    const getStats = async () => {
      const { status, data } = await getDashboardStats();
      if (status === 200) {
        console.log(data);
        setStats(data?.data);
      } else {
        message.error(data?.message || "Failed to get stats");
      }
    };
    const getSchedule = async () => {
      const { status, data } = await getDashboardSchedule();
      if (status === 200) {
        console.log(data);
        setSchedule(data?.data);
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
          <div>{schedule && <Schedule schedule={schedule} />}</div>
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
            {stats ? (
              <ColumnChart data={stats?.unPlanned} />
            ) : (
              <p className="text-center my-5"> Loading... </p>
            )}
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
            {stats ? (
              <ColumnChart data={stats?.planned} />
            ) : (
              <p className="text-center my-5"> Loading... </p>
            )}
          </div>
        </Card>
        <Card
          loading={false}
          className="!bg-primary"
          title={<p className="text-sm md:text-base">Projected Man Hours</p>}
        >
          <div className="flex justify-center">
            <Segmented
              options={["30 Days", "60 Days", "90 Days"]}
              defaultValue="30 Days"
              onChange={(value) => {
                const range = value.replace(" ", ""); // Converts "30 Days" to "30Days"
                setSelectedRange(range);
              }}
            />
          </div>
          <div className="flex justify-center">
            {stats ? (
              <BarChart
                categories={stats[selectedRange]?.Categories || []}
                data={stats[selectedRange]?.data || []}
              />
            ) : (
              <p className="text-center my-5"> Loading... </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
