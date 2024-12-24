"use client";
import { Card, message, Segmented } from "antd";
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
  const [stats, setStats] = useState();
  const [loadingStats, setLoadingStats] = useState(true);
  const [schedule, setSchedule] = useState();
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [activeManHoursTab, setActiveManHoursTab] = useState("30 Days");

  console.log(stats);

  useEffect(() => {
    const getStats = async () => {
      const { status, data } = await getDashboardStats();
      if (status === 200) {
        setStats(data.data);
        setLoadingStats(false);
      } else {
        setLoadingStats(false);
        message.error(data?.message || "Failed to get stats");
      }
    };
    const getSchedule = async () => {
      const { status, data } = await getDashboardSchedule();
      if (status === 200) {
        setSchedule(data.data);
        setLoadingSchedule(false);
      } else {
        setLoadingSchedule(false);
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
            {schedule ? (
              <Schedule schedule={schedule} loadingSchedule={loadingSchedule} />
            ) : (
              <p className="text-center my-5"> Loading... </p>
            )}
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
                setActiveManHoursTab(range);
              }}
            />
          </div>
          <div className="flex justify-center">
            {stats ? (
              <BarChart
                categories={stats[activeManHoursTab]?.Categories || []}
                data={stats[activeManHoursTab]?.data || []}
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
