"use client";
import { Card, message, Spin } from "antd";
import Schedule from "./components/schedule";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  getDashboardSchedule,
  getDashboardStats,
} from "app/services/dashboard";
import { Octagon } from "@/icons/index";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";

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

  const getSchedule = async (date = "2025-03-05") => {
    const { status, data } = await getDashboardSchedule(
      date,
      activeLocation,
      activeSystem
    );
    if (status === 200) {
      setSchedule(data.data);
      setLoadingSchedule(false);
    } else {
      message.error(data?.message || "Failed to get schedule");
      setLoadingSchedule(false);
    }
  };

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
    getStats();
    getSchedule();
  }, [activeLocation, activeSystem]);

  const criticalityColors = {
    critical: "#DA1E28",
    high: "#FF832B",
    medium: "#FFD75F",
    low: "#B3B3B3",
  };

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
                <ColumnChart data={stats?.assets} months={stats?.months} />
                <p className="mt-2 text-center">
                  Lorem ipsum dolor sit amet consectetur. Mauris nisl amet est
                  elit eu amet cursus.
                </p>
              </div>
            ) : (
              <p className="text-center my-20">
                <Spin spinning={true} />
              </p>
            )}
          </div>
        </Card>
        <div className="xl:w-7/12 flex flex-col xl:flex-row gap-6">
          <Card
            loading={false}
            className="!bg-primary xl:w-3/5 shadow-custom"
            title={
              <h2 className="text-center">Planned & Unplanned Work Orders</h2>
            }
          >
            {stats ? (
              <div>
                <LineChart data={stats?.workOrder} months={stats?.months} />
                <p className="mt-2 text-center">
                  Lorem ipsum dolor sit amet consectetur. Mauris nisl amet est
                  elit eu amet cursus.
                </p>
              </div>
            ) : (
              <p className="text-center my-20">
                <Spin spinning={true} />
              </p>
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
            <div className="h-96">
              <div className="px-6 font-medium text-sm pb-2 overflow-auto h-full">
                <Spin spinning={loadingStats || !stats} className="w-full">
                  {Object.keys(stats?.upcomingWorkOrders || {}).map(
                    (dateKey, index) => (
                      <div key={dateKey}>
                        <p
                          className={`px-2 py-1 ${
                            index === 0
                              ? "bg-secondary text-black"
                              : "border-t border-[#D6D6D6]"
                          }`}
                        >
                          <strong>
                            {dayjs(dateKey).isSame(dayjs(), "day") && "Today "}
                            {dayjs(dateKey).format("MM/DD/YYYY")}
                          </strong>
                        </p>
                        {(stats.upcomingWorkOrders[dateKey] || []).length >
                        0 ? (
                          stats.upcomingWorkOrders[dateKey].map((wo) => (
                            <div key={wo._id} className="flex gap-1 my-1 px-2">
                              <span className="mt-1">
                                <Octagon
                                  color={
                                    criticalityColors[wo.criticality] ||
                                    "#B3B3B3"
                                  }
                                />
                              </span>
                              <p>
                                {wo.site?.site} - {wo.system?.system}
                                <p>Asset ID: {wo.assetID}</p>
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-center my-3">No work orders</p>
                        )}
                      </div>
                    )
                  )}
                </Spin>
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
                  <ColumnChart data={stats?.inventory} months={stats?.months} />
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur. Mauris nisl amet est
                    elit eu amet cursus.
                  </p>
                </div>
              ) : (
                <p className="text-center my-20">
                  <Spin spinning={true} />
                </p>
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
            <Spin spinning={!schedule && loadingSchedule}>
              <Schedule
                schedule={schedule}
                setLoadingSchedule={setLoadingSchedule}
                getSchedule={getSchedule}
                setSchedule={setSchedule}
              />
            </Spin>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
