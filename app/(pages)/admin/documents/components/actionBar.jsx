import { useState } from "react";
import { Checkbox, Input, message, Select, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import DownloadPopup from "./downloadPopup";
import { getDocumentsByCategory } from "app/services/document";

const ActionBar = ({ setSearchText, setDocuments, setFetchingDocuments }) => {
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = async (values) => {
    setFetchingDocuments(true);
    setSelectedCategories(values);
    const { status, data } = await getDocumentsByCategory(values);
    if (status === 200) {
      setDocuments(data?.data);
    } else {
      message.error(data?.message || "Failed to fetch documents");
    }
    setFetchingDocuments(false);
  };

  return (
    <>
      <DownloadPopup
        visible={downloadPopup}
        setVisible={setDownloadPopup}
        selectedCategories={selectedCategories}
      />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        <Input.Search
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          className="sm:!w-[300px] searchBar"
        />
        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          <div className="sm:min-w-44 overflow-hidden">
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
              value={selectedCategories}
              onChange={handleChange}
              optionRender={(option) => (
                <Checkbox checked={selectedCategories.includes(option.value)}>
                  {option.label}
                </Checkbox>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
