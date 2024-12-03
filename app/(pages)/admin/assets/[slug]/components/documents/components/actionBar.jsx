import { useState } from "react";
import { Dropdown, Input, Menu, Select, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import DownloadPopup from "./downloadPopup";
import UploadDocPopup from "@/components/uploadDocPopup";
import UploadLinkDocPopup from "@/components/uploadLinkDocPopup";
import { useParams } from "next/navigation";

const ActionBar = ({
  setSearchText,
  searchText,
  selectedCategories,
  setSelectedCategories,
  setDetails
}) => {
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [uploadPopup, setUploadPopup] = useState(false);
  const { slug } = useParams();

  return (
    <>
      <DownloadPopup
        visible={downloadPopup}
        setVisible={setDownloadPopup}
        selectedCategories={selectedCategories}
      />
      <UploadDocPopup
        visible={uploadPopup === "uploadDocument"}
        setVisible={setUploadPopup}
        assetSlug={slug}
        setDetails={setDetails}
      />
      <UploadLinkDocPopup
        visible={uploadPopup === "uploadLinkDocument"}
        setVisible={setUploadPopup}
        assetSlug={slug}
        setDetails={setDetails}
      />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        {/* Search Bar */}
        <Input.Search
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="sm:!w-[300px] searchBar"
        />
        <div className="grid grid-cols-2 sm:flex items-center gap-2">
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

          <Dropdown
            dropdownRender={() => (
              <Menu>
                <Menu.ItemGroup title={null}>
                  <Menu.Item
                    key={0}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => setUploadPopup("uploadDocument")}
                  >
                    Upload Document
                  </Menu.Item>
                  <Menu.Item
                    key={1}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => setUploadPopup("uploadLinkDocument")}
                  >
                    Link Document
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu>
            )}
            trigger={["click"]}
            arrow
            // placement="bottomCenter"
          >
            <Button
              outlined
              size="small"
              text="Upload"
              fullWidth={false}
              className="!px-10"
              prefix={<PlusOutlined />}
            />
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
