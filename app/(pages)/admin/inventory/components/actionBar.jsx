import { useState } from "react";
import {
  Checkbox,
  Dropdown,
  Input,
  Button as AntButton,
  message,
  Select,
  Menu,
} from "antd";
import {
  AppstoreOutlined,
  DeleteOutlined,
  DollarOutlined,
  DownOutlined,
  ExclamationCircleFilled,
  ExportOutlined,
  PlusOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import InventoryFilter from "./filtersDropdown";
import { exportInventory, updateStatus } from "app/services/inventory";
import CreatePurchaseOrderPopup from "../purchase-order/createPurchaseOrderPopup";
import ChangeToAssetPopup from "./changeToAssetPopup";
import Link from "next/link";
import { LinkBroken, SearchIcon } from "@/icons/index";
import ConfirmationPopup from "@/components/confirmationPopup";
import { useRouter } from "next/navigation";

const ActionBar = ({
  columns,
  checkedList,
  setCheckedList,
  selectedRowKeys,
  setSelectedRowKeys,
  setSearchText,
  setFilteredInventory,
  addToShippingCart,
}) => {
  const [changeToAssetVisible, setChangeToAssetVisible] = useState(false);
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [actionPopup, setActionPopup] = useState(false);
  const [actionError, setActionError] = useState(false);
  const router = useRouter();

  const options = columns.slice(0, -1).map(({ key, title }, index) => ({
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

  const actionOptions = [
    {
      label: (
        <p>
          <AppstoreOutlined /> Assign to Asset
        </p>
      ),
      value: "assignToAsset",
    },
    {
      label: (
        <p>
          <ExclamationCircleFilled /> Damaged beyond repair
        </p>
      ),
      value: "damagedBeyondRepair",
    },
    {
      label: (
        <p className="flex items-center gap-1">
          <LinkBroken /> Broken
        </p>
      ),
      value: "broken",
    },
    {
      label: (
        <p>
          <DeleteOutlined /> Disposed
        </p>
      ),
      value: "disposed",
    },
    {
      label: (
        <p>
          <TruckOutlined /> Out for Repair
        </p>
      ),
      value: "outForRepair",
    },
    {
      label: (
        <p>
          <DollarOutlined /> Sell
        </p>
      ),
      value: "sell",
    },
    // {
    //   label: (
    //     <p>
    //       <CheckCircleOutlined /> Active
    //     </p>
    //   ),
    //   value: "active",
    // },
    {
      label: (
        <p>
          <ShoppingCartOutlined /> Add to Shipping Cart
        </p>
      ),
      value: "shippingCart",
    },
  ];

  const handleAction = (value) => {
    if (selectedRowKeys.length === 0) setActionError(true);
    else setActionPopup(value);
  };

  const handleActionConfirm = async () => {
    if (actionPopup === "shippingCart") {
      addToShippingCart(selectedRowKeys);
    } else if (actionPopup === "assignToAsset") {
      router.push(`/admin/new/asset?inventory=${selectedRowKeys[0]}`);
    } else {
      const { status, data } = await updateStatus({
        inventory: [...selectedRowKeys],
        status: actionPopup,
      });
      if (status === 200) {
        message.success(data?.message || "Inventory updated successfully");
        setFilteredInventory((prev) =>
          prev.map((i) =>
            selectedRowKeys.includes(i._id)
              ? { ...i, maintStatus: actionPopup }
              : i
          )
        );
      } else {
        message.error(data.error);
      }
    }
  };

  const modalMessage = () => {
    let isMultipleRows =
      selectedRowKeys.length > 1 && actionPopup === "assignToAsset";
    let message = isMultipleRows
      ? "Please select only one inventory"
      : `Are you sure you want to perform this action on selected ${
          selectedRowKeys.length > 1 ? "Inventories" : "Inventory"
        }`;
    return { message, onConfirm: isMultipleRows ? false : handleActionConfirm };
  };

  return (
    <>
      <ConfirmationPopup
        visible={actionPopup}
        setVisible={setActionPopup}
        title={actionOptions.find((o) => o.value === actionPopup)?.label}
        message={modalMessage().message}
        onConfirm={modalMessage().onConfirm}
        onCancel={() => message.info("Action cancelled")}
      />
      <ConfirmationPopup
        visible={actionError}
        setVisible={setActionError}
        title="Action Cannot Be Performed"
        message="Please select at least one Inventory to perform this action."
        onCancel={() => message.info("Action cancelled")}
        cancelText={"Cancel"}
      />
      {/* {addMaterialTransferVisible && (
        <AddMaterialTransferPopup
          addMaterialTransferVisible={addMaterialTransferVisible}
          setAddMaterialTransferVisible={setAddMaterialTransferVisible}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      )} */}
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

      <div className="">
        <Input
          placeholder="Search"
          prefix={<SearchIcon />}
          onChange={handleSearchChange}
          className="sm:!w-[362px] searchBar"
          allowClear
        />
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3 mt-5">
          <div className="flex gap-3 w-full md:w-auto">
            <div className="w-full sm:min-w-56 overflow-hidden">
              <Select
                value={null}
                name="actions"
                onChange={handleAction}
                placeholder="Actions"
                style={{ height: "44px", width: "100%" }}
                // onChange={handleActionsChange}
                options={actionOptions}
              />
            </div>
            <Dropdown
              open={filterDropdown}
              onOpenChange={setFilterDropdown}
              dropdownRender={() => (
                <InventoryFilter
                  closeDropdown={() => setFilterDropdown(false)}
                  setFilteredInventory={setFilteredInventory}
                />
              )}
              trigger={["click"]}
              arrow
              placement="bottomCenter"
            >
              <AntButton
                text="Filter"
                style={{ padding: "4px 0px", height: "44px" }}
                className="flex !justify-between w-full md:min-w-36 !p-3"
              >
                <span> Filter</span>
                <DownOutlined />
              </AntButton>
            </Dropdown>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-2 md:gap-3">
            {/* <Button
            text="Purchase Order"
            outlined
            onClick={() => setCreatePOVisible(true)}
          /> */}
            {/* <Dropdown
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
          </Dropdown> */}
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
                style={{ padding: "0px 15px" }}
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
            <Link href="/admin/new/inventory">
              <Button
                text="Add New Inventory"
                style={{ padding: "4px 30px" }}
                prefix={<PlusOutlined />}
              />
            </Link>
          </div>
        </div>
        {/* <div className="flex justify-end">
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
      </div> */}
      </div>
    </>
  );
};

export default ActionBar;
