"use client";
import { Card, message, Segmented, Skeleton } from "antd";
import Schedule from "./components/schedule";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  getDashboardSchedule,
  getDashboardStats,
} from "app/services/dashboard";
import { Octagon } from "@/icons/index";
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
    <div className="flex flex-col gap-6 h-[calc(100dvh-140px-40px-40px)] overflow-auto px-3 lg:px-6 pt-3">
      <div className="flex flex-col xl:flex-row gap-6">
        <Card
          className="!bg-primary xl:w-5/12 shadow-custom"
          loading={false}
          title={<h2 className="text-center">Asset Costs</h2>}
        >
          Chart Here...
        </Card>
        <div className="xl:w-7/12 flex flex-col xl:flex-row gap-6">
          <Card
            loading={false}
            className="!bg-primary xl:w-3/5 shacus"
            title={
              <h2 className="text-center">Planned & Unplanned Work Orders</h2>
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
            className="!bg-primary xl:w-2/5 shadow-custom"
            title={
              <h2 className="text-center text-lg font-bold mt-2">
                Work Orders Upcoming
              </h2>
            }
          >
            <div className="overflow-auto">
              <div className="mx-6 font-medium text-sm py-2">
                <p className="bg-[#EFBF60] px-2 py-1">
                  <strong>Today</strong> 2/27/2021
                </p>
                <div className="flex gap-1 mt-2 px-2">
                  <p className="mt-1">
                    <Octagon color="#DA1E28" />
                  </p>
                  <div>
                    <p className="">Rig #21 - Pump System</p>
                    <p>Hydraulic Pump Maintenance</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2 px-2">
                  <p className="mt-1">
                    <Octagon color="#FF832B" />
                  </p>
                  <div>
                    <p className="">Rig #21 - Pump System</p>
                    <p>Hydraulic Pump Maintenance</p>
                  </div>
                </div>

                <div className="flex gap-1 mt-2 px-2">
                  <p className="mt-1">
                    <Octagon color="#FFD75F" />
                  </p>
                  <div>
                    <p className="">Rig #21 - Pump System</p>
                    <p>Hydraulic Pump Maintenance</p>
                  </div>
                </div>
              </div>
              <div className="mx-6 font-medium text-sm py-2 border-t border-[#D6D6D6] opacity-70">
                <p className="px-2">
                  <strong>Tomorrow</strong> 2/28/2021
                </p>
                <div className="flex gap-1 mt-2 px-2">
                  <p className="mt-1">
                    <Octagon color="#DA1E28" />
                  </p>
                  <div>
                    <p className="">Rig #21 - Pump System</p>
                    <p>Hydraulic Pump Maintenance</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2 px-2">
                  <p className="mt-1">
                    <Octagon color="#FF832B" />
                  </p>
                  <div>
                    <p className="">Rig #21 - Pump System</p>
                    <p>Hydraulic Pump Maintenance</p>
                  </div>
                </div>
              </div>
              <div className="mx-6 font-medium text-sm py-2 border-t border-[#D6D6D6] opacity-70">
                <p className="px-2">
                  <strong>Wednesday</strong> 2/28/2021
                </p>
                {/* <div className="flex gap-1 mt-2 px-2">
                  <p className="mt-1">
                    <Octagon color="#DA1E28" />
                  </p>
                  <div>
                    <p className="">Rig #21 - Pump System</p>
                    <p>Hydraulic Pump Maintenance</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2 px-2">
                  <p className="mt-1">
                    <Octagon color="#FF832B" />
                  </p>
                  <div>
                    <p className="">Rig #21 - Pump System</p>
                    <p>Hydraulic Pump Maintenance</p>
                  </div>
                </div> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-5/12">
          <Card
            loading={false}
            className="!bg-primary h-96"
            title={<h2 className="text-center">Inventory Cost</h2>}
          >
            Chart Here...
          </Card>
        </div>
        <div className="grid gap-6 xl:w-7/12">
          <Card
            loading={false}
            className="!bg-primary"
            // title={<p className="text-sm md:text-base">Schedule</p>}
            style={{ overflow: "hidden" }}
          >
            <div>
              {schedule ? (
                <Schedule
                  schedule={schedule}
                  loadingSchedule={loadingSchedule}
                />
              ) : (
                <p className="text-center my-5"> Loading... </p>
              )}
            </div>
          </Card>
        </div>
      </div>
      {/* <div className="grid xl:grid-cols-3 gap-6">
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
      </div> */}
    </div>
  );
};

export default Dashboard;
