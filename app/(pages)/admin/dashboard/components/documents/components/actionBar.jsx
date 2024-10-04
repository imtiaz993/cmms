import { useState } from "react";
import { Checkbox, Input, Select, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";

const ActionBar = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (values) => {
    setSelectedValues(values);
  };

  return (
    <div className="md:flex items-center gap-3 mb-3">
      <Input
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
        style={{ height: "36px" }}
      />
      <div className="grid grid-cols-2 sm:flex items-center gap-2 mt-4 md:mt-0">
        <div className="sm:min-w-40 overflow-hidden">
          <Select
            mode="multiple"
            name="category"
            placeholder="Category"
            style={{ height: "36px", width: "100%" }}
            options={[
              { label: "Last 30 Days", value: "last30Days" },
              { label: "Last 6 Months", value: "last6Months" },
              { label: "Last 12 Months", value: "last12Months" },
              { label: "All", value: "all" },
            ]}
            value={selectedValues}
            onChange={handleChange}
            optionRender={(option) => (
              <Checkbox checked={selectedValues.includes(option.value)}>
                {option.label}
              </Checkbox>
            )}
          />
        </div>
        <Button
          text="Download All"
          outlined
          style={{ padding: "4px 20px" }}
          prefix={<DownloadOutlined />}
        />

      </div>
    </div>
  );
};

export default ActionBar;
