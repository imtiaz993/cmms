import { useEffect, useState } from "react";
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
import AddSystemPopup from "./addSystemPopup";
import { getSites } from "app/services/setUp/sites";
import { SearchIcon } from "@/icons/index";
import { exportSystems } from "app/services/setUp/systems";

const ActionBar = ({
  columns,
  checkedList,
  setCheckedList,
  setSearchText,
  setLoading,
  setSystems,
  handleFetchFilteredSystems,
  activeTab,
}) => {
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [addSystemPopup, setAddSystemPopup] = useState(false);
  const [sites, setSites] = useState([]);

  const options = columns.slice(0, -1).map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  useEffect(() => {
    console.log("called");

    const handleFetchSites = async () => {
      const { status, data } = await getSites();
      if (status === 200) {
        setLoading(false);
        setSites(data.data);
      } else {
        message.error(data.error);
      }
    };
    handleFetchSites();
  }, [activeTab]);

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
    const { status, data } = await exportSystems();
    if (status === 200) {
      window.open(data.data);
    } else {
      message.error(data.error);
    }
  };

  return (
    <>
      <AddSystemPopup
        visible={addSystemPopup}
        setVisible={setAddSystemPopup}
        setSystems={setSystems}
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
                  // setLoading={setLoading}
                  // setLocations={setSystems}
                  handleFetchFilteredSystems={handleFetchFilteredSystems}
                  sites={sites}
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
                text="Columns"
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
              text="New System"
              style={{ padding: "4px 30px" }}
              prefix={<PlusOutlined />}
              onClick={() => setAddSystemPopup(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
