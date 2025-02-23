"use client";
import { Card, message } from "antd";
import Schedule from "./components/schedule";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  getDashboardSchedule,
  getDashboardStats,
} from "app/services/dashboard";
import { Octagon } from "@/icons/index";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ColumnChart = dynamic(() => import("./components/columnChart"), {
  ssr: false,
});
const LineChart = dynamic(() => import("./components/lineChart"), {
  ssr: false,
});

const Dashboard = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [stats, setStats] = useState();
  const [loadingStats, setLoadingStats] = useState(true);
  const [schedule, setSchedule] = useState();
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [activeManHoursTab, setActiveManHoursTab] = useState("30 Days");

  useEffect(() => {
    const getStats = async () => {
      const { status, data } = await getDashboardStats(
        activeLocation,
        activeSystem
      );
      if (status === 200) {
        setStats(data.data);
        setLoadingStats(false);
      } else {
        setLoadingStats(false);
        message.error(data?.message || "Failed to get stats");
      }
    };
    const getSchedule = async () => {
      const { status, data } = await getDashboardSchedule(
        activeLocation,
        activeSystem
      );
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
  }, [activeLocation, activeSystem]);

  return (
    <div className="flex flex-col gap-6 h-[calc(100dvh-140px-40px-40px)] overflow-auto px-3 lg:px-6 pt-3">
      <div className="flex flex-col xl:flex-row gap-6">
        <Card
          className="!bg-primary xl:w-5/12 shadow-custom"
          loading={false}
          title={<h2 className="text-center">Asset Costs</h2>}
        >
          <div className="flex justify-center w-full">
            {stats ? (
              <div>
                <ColumnChart data={stats?.unPlanned} />
                <p className="mt-2 text-center">
                  Lorem ipsum dolor sit amet consectetur. Mauris nisl amet est
                  elit eu amet cursus.
                </p>
              </div>
            ) : (
              <p className="text-center my-5"> Loading... </p>
            )}
          </div>
        </Card>
        <div className="xl:w-7/12 flex flex-col xl:flex-row gap-6">
          <Card
            loading={false}
            className="!bg-primary xl:w-3/5 shacus"
            title={
              <h2 className="text-center">Planned & Unplanned Work Orders</h2>
            }
          >
            {stats ? (
              <div>
                <LineChart />
                <p className="mt-2 text-center">
                  Lorem ipsum dolor sit amet consectetur. Mauris nisl amet est
                  elit eu amet cursus.
                </p>
              </div>
            ) : (
              <p className="text-center my-5"> Loading... </p>
            )}
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
                <p className="bg-secondary px-2 py-1">
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
            className="!bg-primary xl:h-[500px] shadow-custom"
            title={<h2 className="text-center">Inventory Cost</h2>}
          >
            <div className="flex justify-center">
              {stats ? (
                <div>
                  <ColumnChart data={stats?.unPlanned} />
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur. Mauris nisl amet est
                    elit eu amet cursus.
                  </p>
                </div>
              ) : (
                <p className="text-center my-5"> Loading... </p>
              )}
            </div>
          </Card>
        </div>
        <div className="grid gap-6 xl:w-7/12">
          <Card
            loading={false}
            className="!bg-primary shadow-custom"
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
    </div>
  );
};

export default Dashboard;
