import { useState } from "react";
import {
  Checkbox,
  Dropdown,
  Input,
  Menu,
  message,
  Select,
  Button as AntButton,
} from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  DownOutlined,
  ExclamationCircleFilled,
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  SwapOutlined,
  ToolOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import Button from "@/components/common/Button";
import AssetFilter from "./filtersDropdown";
import { exportAssets, updateStatus } from "app/services/assets";
import Link from "next/link";
import { LinkBroken, SearchIcon } from "@/icons/index";
import ConfirmationPopup from "@/components/confirmationPopup";
import { useRouter, useSearchParams } from "next/navigation";

const ActionBar = ({
  showAddAssetModal,
  columns,
  checkedList,
  setCheckedList,
  setSearchText,
  setFilteredAssets,
  selectedRowKeys,
  selectedRowsData,
  addToShippingCart,
}) => {
  const router = useRouter();
  const [showHierarchy, setShowHierarchy] = useState(false);
  //Add Field
  const [addFieldPopupVisible, setAddFieldPopupVisible] = useState(false);
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [actionPopup, setActionPopup] = useState(false);
  const [actionError, setActionError] = useState(false);
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || null;

  const options = columns.slice(0, -1).map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  // Handle search text change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const handleExportAssets = async () => {
    message.success("Export initiated with hierarchy: " + showHierarchy);
    const { status, data } = await exportAssets(showHierarchy);
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
          <ToolOutlined /> New Work Order
        </p>
      ),
      value: "workorder",
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
    {
      label: (
        <p>
          <CheckCircleOutlined /> Active
        </p>
      ),
      value: "active",
    },
    {
      label: (
        <p>
          <SwapOutlined /> Add to Shipping Cart
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
    if (actionPopup === "workorder") {
      let Id = selectedRowsData[0]._id;

      router.push(
        `/admin/new/work-order?Id=${Id}`
        //  + activeLocation &&
        //   activeLocation !== null
        //   ? "?location=" + activeLocation
        //   : ""
      );
    } else if (actionPopup === "shippingCart") {
      addToShippingCart(selectedRowKeys);
    } else {
      const { status, data } = await updateStatus({
        assets: [...selectedRowKeys],
        status: actionPopup,
      });
      if (status === 200) {
        message.success(data?.message || "Asset updated successfully");
        setFilteredAssets((prev) =>
          prev.map((asset) =>
            selectedRowKeys.includes(asset._id)
              ? { ...asset, maintStatus: actionPopup }
              : asset
          )
        );
      } else {
        message.error(data.error);
      }
    }
    //  else if (data.error === "Asset is not available") {
    //   selectedRowKeys.length > 1 && selectedRowKeys.map((id) => {
    //     data.
    //   })

    //   )
    // }
  };

  const navigateToWorkOrder = () => {
    router.push(`/admin/${key}${params}`);
  };

  const modalMessage = () => {
    let isMultipleRows =
      selectedRowKeys.length > 1 && actionPopup === "workorder";
    let message = isMultipleRows
      ? "Please select only one asset"
      : `Are you sure you want to perform this action on selected ${
          selectedRowKeys.length > 1 ? "Assets" : "Asset"
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
        message="Please select at least one Asset to perform this action."
        onCancel={() => message.info("Action cancelled")}
        cancelText={"Cancel"}
      />
      {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3"> */}
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
              <AssetFilter
                closeDropdown={() => setFilterDropdown(false)}
                setFilteredAssets={setFilteredAssets}
                options={actionOptions.filter(
                  (o) => o.value !== "shippingCart" && o.value !== "workorder"
                )}
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
          {/* <Dropdown
            open={filterDropdown}
            onOpenChange={setFilterDropdown}
            dropdownRender={() => (
              <AssetFilter closeDropdown={() => setFilterDropdown(false)} />
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
              text="Columns"
              outlined
              style={{ padding: "0px 15px" }}
              prefix={<SettingOutlined />}
            />
          </Dropdown>
          <Dropdown
            dropdownRender={() => (
              <Menu>
                <Menu.Item>
                  <Checkbox
                    checked={showHierarchy}
                    onChange={(e) => setShowHierarchy(e.target.checked)}
                  >
                    Show Asset Hierarchy
                  </Checkbox>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    onClick={() => {
                      handleExportAssets();
                    }}
                    text="Export"
                  />
                </Menu.Item>
              </Menu>
            )}
            trigger={["click"]}
            arrow
            placement="bottomCenter"
          >
            <Button text="Export" outlined prefix={<ExportOutlined />} />
          </Dropdown>
          <Link
            href={`/admin/new/asset${
              activeLocation ? "?location=" + activeLocation : ""
            }`}
            className="w-full"
          >
            <Button
              text="New Asset"
              style={{ padding: "4px 24px" }}
              prefix={<PlusOutlined />}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
