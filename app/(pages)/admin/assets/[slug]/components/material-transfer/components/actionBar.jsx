import { useState } from "react";
import {
  Checkbox,
  Dropdown,
  Input,
  Menu,
  message,
  Button as AntButton,
} from "antd";
import {
  DownOutlined,
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
  PrinterOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import {
  exportMaterialTransfer,
  getMaterialTransferByStatus,
  printMaterialTransfer,
} from "app/services/materialTransfer";
import MaterialTransferFilter from "app/(pages)/admin/material-transfer/components/filtersDropdown";

const ActionBar = ({
  columns,
  checkedList,
  setCheckedList,
  setSearchText,
  setData,
  setFetchingData,
  superUsers,
  slug,
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
    <>
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3">
        <div className="flex gap-3">
          <Checkbox className="!mx-2" />
          <Dropdown
            open={filterDropdown}
            onOpenChange={setFilterDropdown}
            dropdownRender={() => (
              <MaterialTransferFilter
                setMaterialTransferData={(data) =>
                  setData((prev) => ({ ...prev, materialTransfers: data }))
                }
                closeDropdown={() => setFilterDropdown(false)}
                superUsers={superUsers}
                assetId={slug}
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

          {/* <Button
            text="Print"
            outlined
            style={{ padding: "4px 0px" }}
            fullWidth={false}
            prefix={<PrinterOutlined />}
            onClick={handlePrint}
          /> */}

          <Button
            text="Export"
            outlined
            style={{ padding: "4px 0px" }}
            prefix={<ExportOutlined />}
            onClick={handleExport}
          />
          {/* <Button
            text="New Material Transfer"
            onClick={showAddMaterialTransferModal}
            style={{ padding: "4px 35px" }}
            prefix={<PlusOutlined />}
          /> */}
        </div>
      </div>
    </>
  );
};

export default ActionBar;
