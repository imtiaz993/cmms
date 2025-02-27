import { useState } from "react";
import {
  Checkbox,
  Dropdown,
  Input,
  Menu,
  Button as AntButton,
  Select,
} from "antd";
import DownloadPopup from "./downloadPopup";
import Button from "@/components/common/Button";
import {
  DownOutlined,
  ExportOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import DocumentsFilter from "./filtersDropdown";
import { SearchIcon } from "@/icons/index";

const ActionBar = ({
  setSearchText,
  columns,
  checkedList,
  setCheckedList,
  documents,
  setDocuments,
  isLoading,
  superUsers,
}) => {
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

  return (
    <>
      {/* Search Bar */}

      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3 mt-5">
        <div className="flex gap-3 w-full md:w-auto">
          <Input
            placeholder="Search"
            prefix={<SearchIcon />}
            onChange={(e) => setSearchText(e.target.value)}
            className="sm:!w-[362px] searchBar"
            allowClear
          />
          <Dropdown
            open={filterDropdown}
            onOpenChange={setFilterDropdown}
            dropdownRender={() => (
              <DocumentsFilter
                closeDropdown={() => setFilterDropdown(false)}
                setDocuments={setDocuments}
                isLoading={isLoading}
                superUsers={superUsers}
              />
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
          {/* Category Selector */}
          {/* <div className="sm:min-w-44 overflow-hidden">
            <Select
              mode="multiple"
              name="category"
              placeholder="Category"
              style={{ height: "36px", width: "100%" }}
              options={[
                { label: "Asset", value: "Asset" },
                { label: "Work Order", value: "Work Order" },
                { label: "Material Transfer", value: "Material Transfer" },
              ]}
              value={selectedCategories}
              onChange={setSelectedCategories}
            />
          </div> */}
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
              style={{ padding: "0px 15px", height: "44px" }}
              prefix={<SettingOutlined />}
            />
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
