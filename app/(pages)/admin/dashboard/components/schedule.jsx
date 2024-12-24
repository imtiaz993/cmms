"use client";
import { Badge, Calendar } from "antd";
import { useState } from "react";
import DailyBatchPopup from "./scheduleComponents/dailyBatchPopup";
import dayjs from "dayjs";

const Schedule = ({ schedule, loadingSchedule }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const getScheduleData = (date) => {
    const scheduleItem = schedule.find(
      (item) =>
        dayjs(item.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
    );
    return scheduleItem ? scheduleItem.data : null;
  };

  const cellRender = (current, info) => {
    if (info.type === "date") {
      const data = getScheduleData(current);

      // Log only when data is found
      if (data) {
        console.log("Data found for date:", current.format("YYYY-MM-DD"), data);
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
      <Calendar
        cellRender={cellRender}
        onSelect={(date) => setSelectedDate(date.format("YYYY-MM-DD"))}
      />
    </div>
  );
};

export default Schedule;
