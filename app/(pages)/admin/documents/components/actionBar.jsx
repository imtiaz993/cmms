import { useState } from "react";
import { Checkbox, Dropdown, Input, Menu, Select } from "antd";
import DownloadPopup from "./downloadPopup";
import Button from "@/components/common/Button";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import UploadDocPopup from "@/components/uploadDocPopup";
import UploadLinkDocPopup from "@/components/uploadLinkDocPopup";

const ActionBar = ({
  setSearchText,
  searchText,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [popup, setPopup] = useState();

  return (
    <>
      <DownloadPopup
        visible={popup === "downloadDocument"}
        setVisible={setPopup}
        selectedCategories={selectedCategories}
      />
      <UploadLinkDocPopup
        visible={popup === "uploadLinkDocument"}
        setVisible={setPopup}
        // workOrderSlug={slug}
        // setDetails={setWorkOrder}
      />
      <UploadDocPopup
        visible={popup === "uploadDocument"}
        setVisible={setPopup}
        // workOrderSlug={slug}
        // setDetails={setWorkOrder}
      />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        {/* Search Bar */}
        <div className="flex gap-3 items-center">
          <Checkbox className="!mx-2" />
          <Input.Search
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="sm:!w-[300px] searchBar"
          />
          {/* Category Selector */}
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

        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          <Button
            text="Export"
            outlined
            style={{ padding: "4px 0px", width: "93px" }}
            prefix={<ExportOutlined />}
          />
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
                    onClick={() => setPopup("uploadDocument")}
                  >
                    Upload Document
                  </Menu.Item>
                  <Menu.Item
                    key={1}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => setPopup("uploadLinkDocument")}
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
              size="small"
              text="Upload Document"
              fullWidth={false}
              className="ml-2"
              prefix={<PlusOutlined />}
            />
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
