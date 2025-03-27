import { useState } from "react";
import { Checkbox, Dropdown, Button as AntButton, Menu } from "antd";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import HistoryFilter from "./filtersDropdown";

const ActionBar = ({ checkedList, setCheckedList, columns }) => {
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

  return (
    <>
      <div className="">
        <div className="flex flex-col xl:flex-row xl:justify-end xl:items-center gap-3">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
