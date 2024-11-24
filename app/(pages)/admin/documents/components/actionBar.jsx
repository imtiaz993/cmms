import { useState } from "react";
import { Checkbox, Input, Select } from "antd";
import DownloadPopup from "./downloadPopup";

const ActionBar = ({ setSearchText, searchText, documents, setDocuments }) => {
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = (values) => {
    setSelectedCategories(values);
    // Filter documents where the category is one of the selected categories
    const filteredDocuments = documents?.filter((document) => {
      // If searchText is empty or null, only filter by category
      if (!searchText) {
        return selectedCategories.includes(document["type"]);
      }

      // If searchText is not null or empty, filter by both category and search text across all fields
      return (
        selectedCategories.includes(document["type"]) &&
        Object.values(document).some((value) =>
          value?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
        )
      );
    });
    setDocuments(filteredDocuments);
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
                { label: "Work Order", value: "workOrder" },
                { label: "Material Transfer", value: "materialTransfer" },
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
