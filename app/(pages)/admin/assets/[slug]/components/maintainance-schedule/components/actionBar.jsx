import { useState } from "react";
import { Dropdown, Input, message } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import MaintenanceScheduleFilter from "./filtersDropdown";

const ActionBar = () => {
  const [searchText, setSearchText] = useState("");
  const [filterDropdown, setFilterDropdown] = useState(null);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        <Input.Search
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          className="sm:!w-[300px] searchBar"
        />
        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          <Dropdown
            open={filterDropdown}
            onOpenChange={setFilterDropdown}
            dropdownRender={() => (
              <MaintenanceScheduleFilter
                closeDropdown={() => setFilterDropdown(false)}
              />
            )}
            trigger={["click"]}
            arrow
            placement="bottomCenter"
          >
            <Button
              text="Filter"
              outlined
              style={{ padding: "4px 0px" }}
              prefix={<FilterOutlined />}
              onClick={() => setFilterDropdown(!filterDropdown)}
            />
          </Dropdown>

          <Button
            text="Open Today"
            outlined
            style={{ padding: "4px 20px" }}
            onClick={() =>
              message.error("No upcoming maintenance available to open today")
            }
          />
        </div>
      </div>
    </>
  );
};

export default ActionBar;
