import { useState } from "react";
import { Checkbox, Dropdown, Input, Menu, Select, Tag } from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import DownloadPopup from "./downloadPopup";
import UploadDocPopup from "./uploadDocPopup";
import UploadLinkDocPopup from "./uploadLinkDocPopup";

const ActionBar = () => {
  const [searchText, setSearchText] = useState("");
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [uploadPopup, setUploadPopup] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (values) => {
    setSelectedValues(values);
  };

  return (
    <>
      <DownloadPopup visible={downloadPopup} setVisible={setDownloadPopup} />
      <UploadDocPopup
        visible={uploadPopup === "uploadDocument"}
        setVisible={setUploadPopup}
      />
      <UploadLinkDocPopup
        visible={uploadPopup === "uploadLinkDocument"}
        setVisible={setUploadPopup}
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

          <Dropdown
            dropdownRender={() => (
              <Menu style={{ background: "#4C4C4C" }}>
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
