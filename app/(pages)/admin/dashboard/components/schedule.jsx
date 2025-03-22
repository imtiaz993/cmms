"use client";
import { Badge, Calendar, Spin } from "antd";
import { useState, useRef } from "react";
import DailyBatchPopup from "./scheduleComponents/dailyBatchPopup";
import { Octagon } from "@/icons/index";

const Schedule = ({ schedule, setLoadingSchedule, getSchedule }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const calendarRef = useRef(null);

  const getScheduleData = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    return schedule?.dailyCounts[dateString] || null;
  };

  const handleSelect = (date, { source }) => {
    if (source === "date") {
      const dateString = date.format("YYYY-MM-DD");
      setSelectedDate(dateString);
    }
  };

  const handlePanelChange = async (date) => {
    setLoading(true); // Start loading
    await getSchedule(date.format("YYYY-MM-DD")); // Assuming getSchedule is async
    setLoading(false); // Stop loading
    console.log("Panel changed:", date);
  };

  const cellRender = (current, info) => {
    if (info.type === "date") {
      const data = getScheduleData(current);
      if (data) {
        return data.critical > 0 ||
          data.high > 0 ||
          data.medium > 0 ||
          data.low > 0 ? (
          <div className="m-0 p-0 flex flex-col">
            {data.critical > 0 && (
              <div className="flex items-center gap-2">
                <Octagon color="#ff4d4f" size="16" />
                <p className="inline text-sm font-medium text-gray-700 m-0">
                  {data.critical} Critical
                </p>
              </div>
            )}
            {data.high > 0 && (
              <div className="flex items-center gap-2">
                <Octagon color="#fa8c16" size="16" />
                <p className="inline text-sm font-medium text-gray-700 m-0">
                  {data.high} High
                </p>
              </div>
            )}
            {data.medium > 0 && (
              <div className="flex items-center gap-2">
                <Octagon color="#fadb14" size="16" />
                <p className="inline text-sm font-medium text-gray-700 m-0">
                  {data.medium} Medium
                </p>
              </div>
            )}
            {data.low > 0 && (
              <div className="flex items-center gap-2">
                <Octagon color="#52c41a" size="16" />
                <p className="inline text-sm font-medium text-gray-700 m-0">
                  {data.low} Low
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="m-0 p-2 h-full"> - </div>
        );
      }
    }
    return info.originNode;
  };
  return (
    <div className="schedule">
      {selectedDate && (
        <DailyBatchPopup
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          data={schedule?.dailyCounts[selectedDate] || null}
          getSchedule={getSchedule}
        />
      )}
      <Spin spinning={loading}>
        <Calendar
          ref={calendarRef}
          cellRender={cellRender}
          onSelect={handleSelect}
          onPanelChange={handlePanelChange}
          className="[&_.ant-picker-content]:!min-w-[800px] overflow-auto"
        />
      </Spin>
    </div>
  );
};

export default Schedule;
