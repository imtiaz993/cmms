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
import {
  DownOutlined,
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  SwapOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import AssetFilter from "./filtersDropdown";
import { exportAssets } from "app/services/assets";
import Link from "next/link";
import { SearchIcon } from "@/icons/index";

const ActionBar = ({
  showAddAssetModal,
  columns,
  checkedList,
  setCheckedList,
  setSearchText,
}) => {
  const [showHierarchy, setShowHierarchy] = useState(false);
  //Add Field
  const [addFieldPopupVisible, setAddFieldPopupVisible] = useState(false);
  const [filterDropdown, setFilterDropdown] = useState(null);

  const options = columns.slice(0, -1).map(({ key, title }, index) => ({
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
    message.success("Export initiated with hierarchy: " + showHierarchy);
    const { status, data } = await exportAssets(showHierarchy);
    if (status === 200) {
      window.open(data.data);
    } else {
      message.error(data.error);
    }
  };

  return (
    <>
      {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3"> */}
      <Input
        placeholder="Search"
        prefix={<SearchIcon />}
        onChange={handleSearchChange}
        className="sm:!w-[362px] searchBar"
        allowClear
      />
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3 mt-5">
        <div className="flex gap-3 w-full md:w-auto">
          <Checkbox className="!mx-2" />
          <div className="w-full sm:min-w-40 overflow-hidden">
            <Select
              name="actions"
              placeholder="Actions"
              style={{ height: "44px", width: "100%" }}
              // onChange={handleActionsChange}
              options={[
                {
                  label: (
                    <>
                      <ToolOutlined /> New Work Order
                    </>
                  ),
                  value: "workorder",
                },
                {
                  label: (
                    <>
                      <SwapOutlined /> Material Transfer
                    </>
                  ),
                  value: "materialTransfer",
                },
              ]}
            />
          </div>
          <Dropdown
            open={filterDropdown}
            onOpenChange={setFilterDropdown}
            dropdownRender={() => (
              <AssetFilter closeDropdown={() => setFilterDropdown(false)} />
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
          {/* <Dropdown
            open={filterDropdown}
            onOpenChange={setFilterDropdown}
            dropdownRender={() => (
              <AssetFilter closeDropdown={() => setFilterDropdown(false)} />
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
          </Dropdown> */}
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
            <Button text="Export" outlined prefix={<ExportOutlined />} />
          </Dropdown>
          <Link href="/admin/new/asset" className="w-full">
            <Button
              text="New Asset"
              style={{ padding: "4px 24px" }}
              prefix={<PlusOutlined />}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
