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
import AddMaterialTransferPopup from "../../material-transfer/components/addMaterialTransferPopup";
import { exportInventory } from "app/services/inventory";

const ActionBar = ({
  showAddInventoryModal,
  columns,
  checkedList,
  setCheckedList,
  selectedRowKeys,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [addMaterialTransferVisible, setAddMaterialTransferVisible] =
    useState(false);

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

  const handleExportInventory = async () => {
    const { status, data } = await exportInventory(showHierarchy);
    if (status === 200) {
      message.success("Export initiated with hierarchy: " + showHierarchy);
    } else {
      message.error(data.error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3">
      {addMaterialTransferVisible && (
        <AddMaterialTransferPopup
          addMaterialTransferVisible={addMaterialTransferVisible}
          setAddMaterialTransferVisible={setAddMaterialTransferVisible}
        />
      )}
      <Input.Search
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
        className="sm:!w-[300px] searchBar"
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:flex items-center gap-2">
        {selectedRowKeys.length > 0 && (
          <Button
            text="New Material Transfer"
            onClick={() => {
              setAddMaterialTransferVisible(true);
            }}
            outlined
            style={{ padding: "4px 35px" }}
            prefix={<PlusOutlined />}
            className="col-span-2 sm:col-span-1"
          />
        )}
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
        <Dropdown
          dropdownRender={() => (
            <Menu>
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
                    handleExportInventory();
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
