import { useState } from "react";
import { Dropdown, Input, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import DownloadPopup from "./downloadPopup";
import UploadDocPopup from "@/components/uploadDocPopup";
import UploadLinkDocPopup from "@/components/uploadLinkDocPopup";
import { useParams } from "next/navigation";

const ActionBar = ({ setSearchText, searchText, setDetails }) => {
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [uploadPopup, setUploadPopup] = useState(false);
  const { slug } = useParams();

  return (
    <>
      <DownloadPopup visible={downloadPopup} setVisible={setDownloadPopup} />
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
