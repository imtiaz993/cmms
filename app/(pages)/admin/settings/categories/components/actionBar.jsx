import { useState } from "react";
import { Input, message } from "antd";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "@/components/common/Button";
import { exportInventory } from "app/services/inventory";
import AddCategoryPopup from "./addCategoryPopup";
import { SearchIcon } from "@/icons/index";

const ActionBar = ({ setSearchText, setCategories }) => {
  const [addCategoryPopup, setAddCategoryPopup] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleExport = async () => {
    message.success("Export initiated ");
    const { status, data } = await exportInventory();
    if (status === 200) {
      window.open(data.data);
    } else {
      message.error(data.error);
    }
  };

  return (
    <>
      <AddCategoryPopup
        visible={addCategoryPopup}
        setVisible={setAddCategoryPopup}
        setCategories={setCategories}
      />
      <div className="">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3">
          <div className="flex gap-3 w-full md:w-auto">
            <Input
              placeholder="Search"
              prefix={<SearchIcon />}
              onChange={handleSearchChange}
              className="sm:!w-[362px] searchBar"
              allowClear
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-2">
            <Button
              text="Export"
              outlined
              onClick={handleExport}
              prefix={<ExportOutlined />}
            />
            <Button
              text="New Category"
              style={{ padding: "4px 30px" }}
              prefix={<PlusOutlined />}
              onClick={() => setAddCategoryPopup(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
