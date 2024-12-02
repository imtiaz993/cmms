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
import {
  exportMaterialTransfer,
  getMaterialTransferByStatus,
  printMaterialTransfer,
} from "app/services/materialTransfer";

const ActionBar = ({
  showAddMaterialTransferModal,
  columns,
  checkedList,
  setCheckedList,
  setSearchText,
  setDetails,
  setFetchingData,
}) => {
  const [filterDropdown, setFilterDropdown] = useState(null);
  const options = columns.slice(0, -1).map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const handlePrint = async () => {
    const { status, data } = await printMaterialTransfer();
    if (status === 200) {
      window.open(data.data);
      message.success(data.message || "Printed successfully");
    } else {
      message.error(data.message || "Failed to print");
    }
  };

  const handleExport = async () => {
    const { status, data } = await exportMaterialTransfer();
    if (status === 200) {
      window.open(data.data);
      message.success(data.message || "Exported successfully");
    } else {
      message.error(data.message || "Failed to export");
    }
  };
  return (
    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3 mb-3">
      <Input.Search
        placeholder="Search..."
        onChange={handleSearchChange}
        className="sm:!w-[300px] searchBar"
      />
      <div className="grid  md:flex sm:grid-cols-3 items-center gap-2">
        <Dropdown
          open={filterDropdown}
          onOpenChange={setFilterDropdown}
          dropdownRender={() => (
            <MaterialTransferFilter
              setDetails={setDetails}
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
          text="Print"
          outlined
          style={{ padding: "4px 0px" }}
          fullWidth={false}
          prefix={<PrinterOutlined />}
          onClick={handlePrint}
        />

        <Button
          text="Export"
          outlined
          style={{ padding: "4px 0px" }}
          prefix={<ExportOutlined />}
          onClick={handleExport}
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
