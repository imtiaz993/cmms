import { useState } from "react";
import { Checkbox, Dropdown, Input, Menu, message } from "antd";
import {
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import InventoryFilter from "./filtersDropdown";

const ActionBar = ({
  showAddInventoryModal,
  columns,
  checkedList,
  setCheckedList,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showHierarchy, setShowHierarchy] = useState(false);

  const options = columns.map(({ key, title }, index) => ({
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
    <div className="md:flex items-center gap-3 mb-3">
      <Input
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
        style={{ height: "36px" }}
      />
      <div className="grid grid-cols-2 sm:flex items-center gap-2 mt-4 md:mt-0">
        <Dropdown
          dropdownRender={() => <InventoryFilter />}
          trigger={["click"]}
          arrow
          placement="bottomCenter"
        >
          <Button
            text="Filter"
            outlined
            style={{ padding: "4px 0px" }}
            prefix={<FilterOutlined />}
          />
        </Dropdown>
        <Dropdown
          dropdownRender={() => (
            <Menu style={{ background: "#4C4C4C" }}>
              <Menu.ItemGroup title="Select Columns">
                {options.map((option) => (
                  <Menu.Item
                    key={option.value}
                    style={{ display: "flex", alignItems: "center" }}
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
        <Dropdown
          dropdownRender={() => (
            <Menu style={{ background: "#4C4C4C" }}>
              <Menu.Item>
                <Checkbox
                  checked={showHierarchy}
                  onChange={(e) => setShowHierarchy(e.target.checked)}
                >
                  Show Inventory Hierarchy
                </Checkbox>
              </Menu.Item>
              <Menu.Item>
                <Button
                  onClick={() => {
                    message.success(
                      "Export initiated with hierarchy: " + showHierarchy
                    );
                  }}
                  text="Export"
                />
              </Menu.Item>
            </Menu>
          )}
          trigger={["click"]}
          arrow
          placement="bottomCenter"
        >
          <Button
            text="Export"
            outlined
            style={{ padding: "4px 0px" }}
            prefix={<ExportOutlined />}
          />
        </Dropdown>
        <Button
          text="Add New Inventory"
          onClick={showAddInventoryModal}
          outlined
          style={{ padding: "4px 30px" }}
          prefix={<PlusOutlined />}
        />
      </div>
    </div>
  );
};

export default ActionBar;
