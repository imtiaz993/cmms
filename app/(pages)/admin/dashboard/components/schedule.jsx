"use client";
import { Badge, Calendar, Spin } from "antd";
import { useState, useRef } from "react";
import DailyBatchPopup from "./scheduleComponents/dailyBatchPopup";
import dayjs from "dayjs";

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
        return (
          <div className="m-0 p-0">
            <Badge
              status={"error"}
              className="!flex items-center h-5"
              text={<p className="inline text-xs">{data.critical} Critical</p>}
            />
            <Badge
              status={"warning"}
              className="!flex items-center h-5"
              text={<p className="inline text-xs">{data.high} High</p>}
            />
            <Badge
              status={"processing"}
              className="!flex items-center h-5"
              text={<p className="inline text-xs">{data.medium} Medium</p>}
            />
            <Badge
              status={"default"}
              className="!flex items-center h-5"
              text={<p className="inline text-xs">{data.low} Low</p>}
            />
          </div>
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