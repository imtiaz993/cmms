import { useState } from "react";
import { Input, Select } from "antd";
import DownloadPopup from "./downloadPopup";

const ActionBar = ({
  setSearchText,
  searchText,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [downloadPopup, setDownloadPopup] = useState(false);

  return (
    <>
      <DownloadPopup
        visible={downloadPopup}
        setVisible={setDownloadPopup}
        selectedCategories={selectedCategories}
      />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        {/* Search Bar */}
        <Input.Search
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="sm:!w-[300px] searchBar"
        />

        {/* Category Selector */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          <div className="sm:min-w-44 overflow-hidden">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
