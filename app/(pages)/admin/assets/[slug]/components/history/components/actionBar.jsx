import { useState } from "react";
import { Checkbox, Dropdown, Input, Menu, message } from "antd";
import { ExportOutlined, SettingOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";

const ActionBar = ({ columns, checkedList, setCheckedList }) => {
  const [searchText, setSearchText] = useState("");

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

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3">
      <Input.Search
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
        className="sm:!w-[300px] searchBar"
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:flex items-center gap-2">
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
          text="Export"
          outlined
          style={{ padding: "4px 0px" }}
          onClick={() => {
            message.success("Export initiated");
          }}
          prefix={<ExportOutlined />}
        />
        <Button
          text="Print"
          onClick={() => message.info("Print will be available soon.")}
          outlined
        />
      </div>
    </div>
  );
};

export default ActionBar;
