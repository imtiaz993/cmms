import { useState } from "react";
import { Input, message } from "antd";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import { SearchIcon } from "@/icons/index";
import { exportEvents } from "app/services/setUp/events";
import AddVendorPopup from "./addVendorPopup";

const ActionBar = ({ setSearchText, setVendors }) => {
  const [addVendorPopup, setAddVendorPopup] = useState(false);

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
      <AddVendorPopup
        visible={addVendorPopup}
        setVendors={setVendors}
        setVisible={setAddVendorPopup}
      />
      <div className="">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
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
          <div className="md:flex items-center gap-2">
            {/* <Button
              text="Export"
              outlined
              onClick={handleExport}
              prefix={<ExportOutlined />}
            /> */}
            <Button
              text="New Vendor"
              style={{ padding: "4px 30px" }}
              prefix={<PlusOutlined />}
              onClick={() => setAddVendorPopup(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
