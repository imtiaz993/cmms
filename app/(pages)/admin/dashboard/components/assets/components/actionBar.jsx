import { useState } from "react";
import { Button, Checkbox, Dropdown, Input, Menu } from "antd";
import AssetFilter from "./filtersDropdown";

const ActionBar = ({ showAddAssetModal,columns,  checkedList, setCheckedList }) => {
  const [searchText, setSearchText] = useState("");
  const [showHierarchy, setShowHierarchy] = useState(false);

  const options = columns.map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  const handleMenuClick = (value) => {
    setCheckedList(value);
  };

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const menu = (
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
                setVisible(true);
              }}
            >
              {option.label}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  const exportMenu = (
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
          type="primary"
          onClick={() => {
            // Handle export logic here
            message.success(
              "Export initiated with hierarchy: " + showHierarchy
            );
            setExportVisible(false);
          }}
        >
          Export
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex gap-3">
      <Input
        placeholder="Search..."
        style={{ marginBottom: 16 }}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Dropdown
        dropdownRender={() => <AssetFilter />}
        trigger={["click"]}
        arrow
        placement="bottomCenter"
      >
        <Button>Filter</Button>
      </Dropdown>
      <Dropdown
        dropdownRender={() => menu}
        trigger={["click"]}
        arrow
        placement="bottomCenter"
      >
        <Button>Column Settings</Button>
      </Dropdown>
      <Dropdown
        dropdownRender={() => exportMenu}
        trigger={["click"]}
        arrow
        placement="bottomCenter"
      >
        <Button>Export</Button>
      </Dropdown>
      <Button type="primary" onClick={showAddAssetModal}>
        Add New Asset
      </Button>
    </div>
  );
};

export default ActionBar;
