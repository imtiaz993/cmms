import { useState } from "react";
import {
  Checkbox,
  Dropdown,
  Input,
  Button as AntButton,
  message,
  Menu,
} from "antd";
import {
  DownOutlined,
  ExportOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import FilterDropdown from "./filtersDropdown";
import { exportInventory } from "app/services/inventory";
import AddSitePopup from "./addSitePopup";
import { SearchIcon } from "@/icons/index";

const ActionBar = ({
  columns,
  checkedList,
  setCheckedList,
  setSearchText,
  setLoading,
  setSites,
}) => {
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [addSitePopup, setAddSitePopup] = useState(false);

  const options = columns.slice(0, -1).map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSettingsChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const handleExport = async () => {
    message.success("Export initiated ");
    const { status, data } = await exportInventory();
    if (status === 200) {
      window.open(data.data);
    } else {
      message.error(data.error);
    }
  };

  return (
    <>
      <AddSitePopup
        visible={addSitePopup}
        setSites={setSites}
        setVisible={setAddSitePopup}
      />
      <div className="">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3">
          <div className="flex gap-3 w-full md:w-auto">
            <Input
              placeholder="Search"
              prefix={<SearchIcon />}
              onChange={handleSearchChange}
              className="sm:!w-[362px] searchBar"
              allowClear
            />
            <Dropdown
              open={filterDropdown}
              onOpenChange={setFilterDropdown}
              dropdownRender={() => (
                <FilterDropdown
                  closeDropdown={() => setFilterDropdown(false)}
                  setLoading={setLoading}
                  setSites={setSites}
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
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-2">
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
                            handleSettingsChange(option.value);
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
                style={{ padding: "4px 24px" }}
                prefix={<SettingOutlined />}
              />
            </Dropdown>

            <Button
              text="Export"
              outlined
              onClick={handleExport}
              prefix={<ExportOutlined />}
            />
            <Button
              text="New Site"
              style={{ padding: "4px 30px" }}
              prefix={<PlusOutlined />}
              onClick={() => setAddSitePopup(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
