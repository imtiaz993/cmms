import { useState } from "react";
import { Checkbox, Dropdown, Button as AntButton, message, Menu } from "antd";
import { DownOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import { useParams } from "next/navigation";
import UploadDocPopup from "@/components/uploadDocPopup";
import UploadLinkDocPopup from "@/components/uploadLinkDocPopup";
import DocumentsFilter from "app/(pages)/admin/documents/components/filtersDropdown";

const ActionBar = ({
  checkedList,
  setCheckedList,
  columns,
  setData,
  superUsers,
  setDocuments,
  isLoading,
}) => {
  const [uploadPopup, setUploadPopup] = useState(false);
  const { slug } = useParams();
  const [filterDropdown, setFilterDropdown] = useState(null);
  const options = columns.slice(0, -1).map(({ key, title }, index) => ({
    label: title || key,
    value: key,
    key: index,
  }));

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  return (
    <>
      <UploadDocPopup
        visible={uploadPopup === "uploadDocument"}
        setVisible={setUploadPopup}
        workOrderSlug={slug}
        setDetails={setData}
      />
      <UploadLinkDocPopup
        visible={uploadPopup === "uploadLinkDocument"}
        setVisible={setUploadPopup}
        workOrderSlug={slug}
        setDetails={setData}
      />
      <div className="">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3">
          <div className="flex gap-3">
            <div className="sm:min-w-36 overflow-hidden">
              <Dropdown
                open={filterDropdown}
                onOpenChange={setFilterDropdown}
                dropdownRender={() => (
                  <DocumentsFilter
                    closeDropdown={() => setFilterDropdown(false)}
                    setDocuments={(data) => {
                      setData((prev) => ({
                        ...prev,
                        documents: data,
                      }));
                    }}
                    workorder={slug}
                    isLoading={isLoading}
                    superUsers={superUsers}
                  />
                )}
                trigger={["click"]}
                arrow
                placement="bottomCenter"
              >
                <AntButton
                  text="Filter"
                  style={{ padding: "4px 0px", width: "144px", height: "44px" }}
                  className="flex !justify-between w-full !p-3"
                >
                  <span> Filter</span>
                  <DownOutlined />
                </AntButton>
              </Dropdown>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-2 md:gap-3">
            <Dropdown
              dropdownRender={() => (
                <Menu>
                  <Menu.ItemGroup title="Select Columns">
                    {options.map((option) => (
                      <Menu.Item
                        key={option.value}
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={(e) => e?.stopPropagation()}
                      >
                        <Checkbox
                          value={option.value}
                          checked={checkedList.includes(option.value)}
                          onChange={() => {
                            handleCheckboxChange(option.value);
                          }}
                        >
                          {option.label}
                        </Checkbox>
                      </Menu.Item>
                    ))}
                  </Menu.ItemGroup>
                </Menu>
              )}
              trigger={["click"]}
              arrow
              placement="bottomCenter"
            >
              <Button
                text="Settings"
                outlined
                style={{ padding: "0px 15px", height: "44px" }}
                prefix={<SettingOutlined />}
              />
            </Dropdown>
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
              placement="bottomCenter"
            >
              <Button
                text="New Document"
                style={{ padding: "0px 20px", height: "44px" }}
                className="!min-w-40"
                prefix={<PlusOutlined />}
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
