import { useState } from "react";
import { Checkbox, Dropdown, Input, Menu, message, Select } from "antd";
import {
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
  PrinterOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import MaterialTransferFilter from "./filtersDropdown";

const ActionBar = ({
  showAddMaterialTransferModal,
  columns,
  checkedList,
  setCheckedList,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showHierarchy, setShowHierarchy] = useState(false);

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
      <div className="grid  md:flex sm:grid-cols-3 items-center gap-2">
        <div className="sm:min-w-28 col-span-2 sm:col-span-1">
          <Select
            name="status"
            placeholder="Status"
            style={{ height: "36px", width: "100%" }}
            options={[
              { label: "Draft", value: "draft" },
              { label: "In Progress", value: "progress" },
              { label: "Approved", value: "approved" },
              { label: "Declined", value: "declined" },
            ]}
          />
        </div>
        <Dropdown
          dropdownRender={() => <MaterialTransferFilter />}
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
            <Menu>
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

        <Button
          text="Print"
          outlined
          style={{ padding: "4px 0px" }}
          fullWidth={false}
          prefix={<PrinterOutlined />}
          onClick={() => {
            message.success("Printed Successfully");
          }}
        />

        <Button
          text="Export"
          outlined
          style={{ padding: "4px 0px" }}
          prefix={<ExportOutlined />}
          onClick={() => {
            message.success(
              "Export initiated with hierarchy: " + showHierarchy
            );
          }}
        />
        <Button
          text="New Material Transfer"
          onClick={showAddMaterialTransferModal}
          outlined
          style={{ padding: "4px 35px" }}
          prefix={<PlusOutlined />}
        />
      </div>
    </div>
  );
};

export default ActionBar;
