import { useState } from "react";
import { Input, message } from "antd";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import AddEventPopup from "./addEventPopup";
import { SearchIcon } from "@/icons/index";
import { exportEvents } from "app/services/setUp/events";

const ActionBar = ({ setSearchText, setEvents }) => {
  const [addEventPopup, setAddEventPopup] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleExport = async () => {
    message.success("Export initiated ");
    const { status, data } = await exportEvents();
    if (status === 200) {
      window.open(data.data);
    } else {
      message.error(data.error);
    }
  };

  return (
    <>
      <AddEventPopup
        visible={addEventPopup}
        setEvents={setEvents}
        setVisible={setAddEventPopup}
      />
      <div className="">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3">
          <div>
            {" "}
            <Input
              placeholder="Search"
              prefix={<SearchIcon />}
              onChange={handleSearchChange}
              className="sm:!w-[362px] searchBar"
              allowClear
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-2">
            <Button
              text="Export"
              outlined
              onClick={handleExport}
              prefix={<ExportOutlined />}
            />
            <Button
              text="New Event"
              style={{ padding: "4px 30px" }}
              prefix={<PlusOutlined />}
              onClick={() => setAddEventPopup(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
