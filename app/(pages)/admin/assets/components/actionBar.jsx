import { useState } from "react";
import { Checkbox, Dropdown, Input, Menu, message } from "antd";
import {
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import AssetFilter from "./filtersDropdown";
import { exportAssets } from "app/services/assets";
import AddFieldPopup from "@/components/addFieldPopup";

const ActionBar = ({
  showAddAssetModal,
  columns,
  checkedList,
  setCheckedList,
  setSearchText,
  setAssets,
}) => {
  const [showHierarchy, setShowHierarchy] = useState(false);
  //Add Field
  const [addFieldPopupVisible, setAddFieldPopupVisible] = useState(false);

  const options = columns.map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  // Handle search text change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const handleExportAssets = async () => {
    const { status, data } = await exportAssets(showHierarchy);
    if (status === 200) {
      message.success("Export initiated with hierarchy: " + showHierarchy);
    } else {
      message.error(data.error);
    }
  };

  return (
    <>
      {/* AddFieldModal Component */}
      <AddFieldPopup
        visible={addFieldPopupVisible}
        setVisible={setAddFieldPopupVisible}
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3">
        <Input.Search
          placeholder="Search..."
          onChange={handleSearchChange}
          className="sm:!w-[300px] searchBar"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:flex items-center gap-2">
          <Button
            onClick={() => setAddFieldPopupVisible(true)}
            text="Manage Fields"
            outlined
          />
          <Dropdown
            dropdownRender={() => <AssetFilter setAssets={setAssets} />}
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
                    Show Asset Hierarchy
                  </Checkbox>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    onClick={() => {
                      handleExportAssets();
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
            text="Add New Asset"
            onClick={showAddAssetModal}
            outlined
            style={{ padding: "4px 24px" }}
            prefix={<PlusOutlined />}
          />
        </div>
      </div>
    </>
  );
};

export default ActionBar;
