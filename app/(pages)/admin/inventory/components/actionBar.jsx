import { useState } from "react";
import { Checkbox, Dropdown, Input, Menu, message } from "antd";
import {
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import InventoryFilter from "./filtersDropdown";
import AddMaterialTransferPopup from "../../material-transfer/components/addMaterialTransferPopup";
import AddFieldPopup from "../../../../../components/addFieldPopup";
import { exportInventory } from "app/services/inventory";
import CreatePurchaseOrderPopup from "../purchase-order/createPurchaseOrderPopup";
import ChangeToAssetPopup from "./changeToAssetPopup";

const ActionBar = ({
  showAddInventoryModal,
  columns,
  checkedList,
  setCheckedList,
  selectedRowKeys,
  setSelectedRowKeys,
  setSearchText,
}) => {
  const [addMaterialTransferVisible, setAddMaterialTransferVisible] =
    useState(false);
  const [changeToAssetVisible, setChangeToAssetVisible] = useState(false);
  const [filterDropdown, setFilterDropdown] = useState(null);

  const options = columns.map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  const [createPOVisible, setCreatePOVisible] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const handleExportInventory = async () => {
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
      {addMaterialTransferVisible && (
        <AddMaterialTransferPopup
          addMaterialTransferVisible={addMaterialTransferVisible}
          setAddMaterialTransferVisible={setAddMaterialTransferVisible}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      )}
      {changeToAssetVisible && (
        <ChangeToAssetPopup
          addAssetVisible={changeToAssetVisible}
          setAddAssetVisible={setChangeToAssetVisible}
          selectedRowKeys={selectedRowKeys}
        />
      )}
      <CreatePurchaseOrderPopup
        visible={createPOVisible}
        setVisible={setCreatePOVisible}
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3">
        <Input.Search
          placeholder="Search..."
          onChange={handleSearchChange}
          className="sm:!w-[300px] searchBar"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:flex items-center gap-2">
          {/* <Button
            text="Purchase Order"
            outlined
            onClick={() => setCreatePOVisible(true)}
          /> */}
          <Dropdown
            open={filterDropdown}
            onOpenChange={setFilterDropdown}
            dropdownRender={() => (
              <InventoryFilter closeDropdown={() => setFilterDropdown(false)} />
            )}
            trigger={["click"]}
            arrow
            placement="bottomCenter"
          >
            <Button
              text="Filter"
              outlined
              style={{ padding: "4px 0px" }}
              prefix={<FilterOutlined />}
              onClick={() => setFilterDropdown(!filterDropdown)}
            />
          </Dropdown>
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
              text="Column Settings"
              outlined
              style={{ padding: "4px 24px" }}
              prefix={<SettingOutlined />}
            />
          </Dropdown>

          <Button
            text="Export"
            outlined
            onClick={handleExportInventory}
            style={{ padding: "4px 0px" }}
            prefix={<ExportOutlined />}
          />
          <Button
            text="Add New Inventory"
            onClick={showAddInventoryModal}
            outlined
            style={{ padding: "4px 30px" }}
            prefix={<PlusOutlined />}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:flex items-center gap-2">
          {selectedRowKeys.length > 0 && (
            <Button
              text="New Material Transfer"
              onClick={() => {
                setAddMaterialTransferVisible(true);
              }}
              outlined
              style={{ padding: "4px 35px" }}
              prefix={<PlusOutlined />}
              className="col-span-2 sm:col-span-1"
            />
          )}
          {selectedRowKeys.length == 1 && (
            <Button
              text="Change to Asset"
              onClick={() => {
                setChangeToAssetVisible(true);
              }}
              outlined
              style={{ padding: "4px 35px" }}
              className="col-span-2 sm:col-span-1"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ActionBar;
