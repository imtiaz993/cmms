import { useState } from "react";
import { Checkbox, Input, Select, Tag } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";

const ActionBar = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (values) => {
    setSelectedValues(values);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        <Input.Search
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          className="sm:!w-[300px] searchBar"
        />
        <div>
          <Button
            text="Print"
            outlined
            style={{ padding: "4px 20px" }}
            prefix={<PrinterOutlined />}
          />
        </div>
      </div>
    </>
  );
};

export default ActionBar;
