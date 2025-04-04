import { useState } from "react";
import { Checkbox, Dropdown, Button as AntButton, message, Menu } from "antd";
import {
  DownOutlined,
  ExportOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import ReadingsFilter from "./filtersDropdown";
import { exportReadings } from "app/services/reports";

const ActionBar = ({ checkedList, setCheckedList, columns, setReadings }) => {
  const [filterDropdown, setFilterDropdown] = useState(null);
  const options = columns.slice(0, -1).map(({ key, title }, index) => ({
    label: title || key,
    value: key,
    key: index,
  }));

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const handleExport = async () => {
    const { status, data } = await exportReadings();
    if (status === 200) {
      message.success("Export initiated");
      window.open(data.data);
    } else {
      message.error(data.error);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3">
          <div className="flex gap-3">
            <div className="sm:min-w-36 overflow-hidden">
              <Dropdown
                open={filterDropdown}
                onOpenChange={setFilterDropdown}
                dropdownRender={() => (
                  <ReadingsFilter
                    closeDropdown={() => setFilterDropdown(false)}
                    setReadings={setReadings}
                  />
                )}
                trigger={["click"]}
                arrow
                placement="bottomCenter"
              >
                <AntButton
                  text="Filter"
                  style={{ padding: "4px 0px", width: "144px", height: "44px" }}
                  className="flex !justify-between w-full !p-3"
                >
                  <span> Filter</span>
                  <DownOutlined />
                </AntButton>
              </Dropdown>
            </div>
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
                text="Columns"
                outlined
                style={{ padding: "0px 15px", height: "44px" }}
                prefix={<SettingOutlined />}
              />
            </Dropdown>
            <Button
              text="Export"
              outlined
              onClick={handleExport}
              style={{ padding: "0px 15px", height: "44px" }}
              prefix={<ExportOutlined />}
            />
            {/* <Button
              text="New Event"
              style={{ padding: "0px 20px", height: "44px" }}
              prefix={<PlusOutlined />}
              onClick={() => router.push("/admin/events/new")}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
