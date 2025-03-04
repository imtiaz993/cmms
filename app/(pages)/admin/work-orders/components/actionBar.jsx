import { useState } from "react";
import {
  Checkbox,
  Dropdown,
  Input,
  Menu,
  message,
  Select,
  Button as AntButton,
} from "antd";
import { useRouter } from "next/navigation";
import {
  DownOutlined,
  ExportOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  exportWorkOrders,
  getWorkOrdersByStatus,
} from "app/services/workOrders";
import Button from "@/components/common/Button";
import WOFilter from "./filtersDropdown";
import { SearchIcon } from "@/icons/index";

const ActionBar = ({
  showAddWOModal,
  columns,
  checkedList,
  setCheckedList,
  setSearchText,
  setWorkOrders,
  unplanned,
  setFetchingWorkOrders,
}) => {
  const router = useRouter();
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Pass search text to parent component
  };

  const handleStatusChange = async (value) => {
    console.log("value", value);
    setFetchingWorkOrders(true);
    const { status, data } = await getWorkOrdersByStatus(
      value,
      unplanned ? "unplanned" : "planned"
    );

    if (status === 200) {
      setWorkOrders(data?.data);
    } else {
      message.error(data.error || "Failed to fetch data");
    }
    setFetchingWorkOrders(false);
  };

  const handleExport = async () => {
    const { status, data } = await exportWorkOrders(
      unplanned ? "unplanned" : "planned"
    );
    if (status === 200) {
      message.success("Export initiated");
    } else {
      message.error(data.error || "Failed to export data");
    }
  };

  return (
    <div className="">
      <Input
        placeholder="Search"
        prefix={<SearchIcon />}
        onChange={handleSearchChange}
        className="sm:!w-[362px] searchBar"
        allowClear
      />
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3 mt-5">
        <div className="flex gap-3">
          <div className="w-full sm:min-w-56 overflow-hidden">
            <Select
              name="status"
              defaultValue={"all"}
              placeholder="Status"
              style={{ height: "44px", width: "100%" }}
              onChange={handleStatusChange}
              options={[
                { label: "Open", value: "open" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
                { label: "All", value: "all" },
              ]}
            />
          </div>
          <Dropdown
            open={filterDropdown}
            onOpenChange={setFilterDropdown}
            dropdownRender={() => (
              <WOFilter
                setWorkOrders={setWorkOrders}
                closeDropdown={() => setFilterDropdown(false)}
                WOType={unplanned ? "unplanned" : "planned"}
              />
            )}
            trigger={["click"]}
            arrow
            placement="bottomCenter"
          >
            <AntButton
              text="Filter"
              style={{ padding: "4px 0px", height: "44px" }}
              className="flex !justify-between w-full md:min-w-36 !p-3"
            >
              <span> Filter</span>
              <DownOutlined />
            </AntButton>
          </Dropdown>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-2 md:gap-3">
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
              text="Settings"
              outlined
              style={{ padding: "0px 15px" }}
              prefix={<SettingOutlined />}
            />
          </Dropdown>

          <Button
            text="Export"
            outlined
            style={{ padding: "4px 0px" }}
            onClick={handleExport}
            prefix={<ExportOutlined />}
          />

          <div>
            <Button
              text={`${
                unplanned ? "New Work Order" : "New Maintenance Schedule"
              }`}
              onClick={
                unplanned
                  ? () => router.push("/admin/new/work-order")
                  : showAddWOModal
              }
              // outlined
              style={{ padding: "4px 10px" }}
              className="!text-xs md:!text-sm"
              prefix={<PlusOutlined />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
