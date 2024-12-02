import { useState } from "react";
import { Checkbox, Dropdown, Input, Menu, message, Select } from "antd";
import {
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import WOFilter from "./filtersDropdown";

const ActionBar = ({
  showAddWOModal,
  columns,
  checkedList,
  setCheckedList,
  unplanned,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [filterDropdown, setFilterDropdown] = useState(null);

  const options = columns.slice(0, -1).map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3 mb-3">
      <Input.Search
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
        className="sm:!w-[300px] searchBar"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-2">
        <div className="sm:min-w-28 overflow-hidden">
          <Select
            name="status"
            placeholder="Status"
            style={{ height: "36px", width: "100%" }}
            options={[
              { label: "Open", value: "open" },
              { label: "Completed", value: "completed" },
              { label: "Cancelled", value: "cancelled" },
              { label: "All", value: "all" },
            ]}
          />
        </div>
        <div className="sm:min-w-32 overflow-hidden">
          <Select
            name="timeRange"
            placeholder="Time Range"
            style={{ height: "36px", width: "100%" }}
            options={[
              { label: "Last 30 Days", value: "last30Days" },
              { label: "Last 6 Months", value: "last6Months" },
              { label: "Last 12 Months", value: "last12Months" },
              { label: "All", value: "all" },
            ]}
          />
        </div>
        <Dropdown
          open={filterDropdown}
          onOpenChange={setFilterDropdown}
          dropdownRender={() => (
            <WOFilter closeDropdown={() => setFilterDropdown(false)} />
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

        <Dropdown
          dropdownRender={() => (
            <Menu>
              <Menu.ItemGroup title="Select Columns">
                {options.map((option) => (
                  <Menu.Item
                    key={option.value}
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={(e) => e?.stopPropagation()}
                  >
                    <Checkbox
                      value={option.value}
                      checked={checkedList.includes(option.value)}
                      onChange={() => {
                        handleCheckboxChange(option.value);
                      }}
                    >
                      {option.label}
                    </Checkbox>
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            </Menu>
          )}
          trigger={["click"]}
          arrow
          placement="bottomCenter"
        >
          <Button
            text="Column Settings"
            outlined
            style={{ padding: "4px 24px" }}
            prefix={<SettingOutlined />}
          />
        </Dropdown>

        <Button
          text="Export"
          outlined
          style={{ padding: "4px 0px" }}
          onClick={() => {
            message.success(
              "Export initiated with hierarchy: " + showHierarchy
            );
          }}
          prefix={<ExportOutlined />}
        />
        <div>
          <Button
            text={`${
              unplanned ? "Create Unplanned WO" : "Open Early Maintenance"
            }`}
            onClick={showAddWOModal}
            outlined
            style={{ padding: "4px 10px" }}
            prefix={<PlusOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
