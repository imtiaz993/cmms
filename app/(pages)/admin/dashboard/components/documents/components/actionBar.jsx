import { useState } from "react";
import { Checkbox, Input, Select, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import DownloadPopup from "./downloadPopup";

const ActionBar = () => {
  const [searchText, setSearchText] = useState("");
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (values) => {
    setSelectedValues(values);
  };

  return (
    <div className="md:flex items-center gap-3 mb-3">
      <DownloadPopup visible={downloadPopup} setVisible={setDownloadPopup} />
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
              { label: "Asset", value: "Asset" },
              { label: "Asset Class", value: "assetClass" },
              { label: "Procedure", value: "procedure" },
              { label: "Work Order", value: "workOrder" },
              { label: "Checklist", value: "checklist" },
              { label: "Material Transfer", value: "materialTransfer" },
              { label: "Cost", value: "Cost" },
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
          onClick={() => setDownloadPopup(true)}
        />
      </div>
    </div>
  );
};

export default ActionBar;
