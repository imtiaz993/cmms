import { Badge, Calendar } from "antd";
import { useState } from "react";
import DailyBatchPopup from "./components/dailyBatchPopup";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const monthCellRender = (value) => {
    const num = value.month() === 8 ? 1394 : null;

    return num ? (
      <div className="text-xs sm:text-sm md:text-base text-center">
        <section className="text-sm sm:text-base md:text-xl">{num}</section>
        <span>Work Orders</span>
      </div>
    ) : null;
  };

  const cellRender = (current, info) => {
    if (info.type === "date")
      return (
        <div className="m-0 p-0">
          <Badge
            status={"error"}
            className="!flex items-center h-5"
            text={<p className="inline text-xs">10 Critical</p>}
          />
          <Badge
            status={"warning"}
            className="!flex items-center h-5"
            text={<p className="inline text-xs">12 High</p>}
          />
          <Badge
            status={"processing"}
            className="!flex items-center h-5"
            text={<p className="inline text-xs">15 Medium</p>}
          />
          <Badge
            status={"default"}
            className="!flex items-center h-5"
            text={<p className="inline text-xs">20 Low</p>}
          />
        </div>
      );
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <div className="schdeule h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-8 pb-4">
      <DailyBatchPopup
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Calendar
        cellRender={cellRender}
        className="!bg-[#212020]"
        onSelect={(date) => setSelectedDate(date.format("YYYY-MM-DD"))}
      />
    </div>
  );
};
export default Schedule;
