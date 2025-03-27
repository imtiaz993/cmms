"use client";

import Button from "@/components/common/Button";
import Tabs from "./components/tabs";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LeftOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
  ToolOutlined,
  TruckOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { message, Select, Spin } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateStatus } from "app/services/assets";
import ConfirmationPopup from "@/components/confirmationPopup";
import { LinkBroken } from "@/icons/index";
import { getAdminsManagers } from "app/services/common";
import { getInventoryDetails } from "app/services/inventory";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingCart } from "app/redux/slices/inventoryShippingCartSlice";

const InventoryDetails = () => {
  const [data, setData] = useState();
  const [details, setDetails] = useState();
  const [actionPopup, setActionPopup] = useState(false);
  const router = useRouter();
  const { slug } = useParams();
  const [superUsers, setSuperUsers] = useState([]);
  const dispatch = useDispatch();
  const { inventoryShippingCart } = useSelector(
    (state) => state.inventoryShippingCart
  );

  useEffect(() => {
    const getAsset = async () => {
      const { status, data } = await getInventoryDetails(slug);
      if (status === 200) {
        console.log(data);
        setData(data?.data);
        setDetails(data?.data.dashboard);
      } else {
        message.error(data?.message || "Failed to fetch data");
      }
    };
    const handleFetchSuperUsers = async () => {
      const { status, data } = await getAdminsManagers();
      if (status === 200) {
        setSuperUsers(data.data);
      } else {
        message.error(data.error);
      }
    };
    handleFetchSuperUsers();
    getAsset();
  }, [slug]);

  const options = [
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

  const addToShippingCart = async () => {
    if (details.isAvailable === false)
      return message.error("This inventory can not be added to shipping cart");
    dispatch(updateShippingCart({ ...details, selectedQuantity: 1 }));
    message.success("Inventory added to shipping cart");
  };

  const handleAction = (value) => {
    setActionPopup(value);
  };

  const handleActionConfirm = async () => {
    if (actionPopup === "shippingCart") {
      addToShippingCart();
    } else if (actionPopup === "assignToAsset") {
      router.push(`/admin/new/asset?inventory=${slug}`);
    } else {
      const { status, data } = await updateStatus({
        assets: [slug],
        status: actionPopup,
      });
      if (status === 200) {
        message.success(data?.message || "Asset updated successfully");
        setData((prev) => ({
          ...prev,
          dashboard: { ...prev.dashboard, maintStatus: actionPopup },
        }));
      }
    }
  };

  return data ? (
    <div className="overflow-auto h-[calc(100dvh-130px)]">
      <ConfirmationPopup
        visible={actionPopup}
        setVisible={setActionPopup}
        title={options.find((o) => o.value === actionPopup)?.label}
        message="Are you sure you want to perform this action?"
        onConfirm={handleActionConfirm}
        onCancel={() => message.info("Action cancelled")}
      />
      <div className="mx-5 lg:mx-10">
        <p className="text-sm text-[#828282]">
          Inventory {" > " + details?.partNumber}
        </p>
        <div className="mt-4 mr-5 flex justify-between">
          <Button
            text="Back to Inventory"
            onClick={() => router.push("/admin/inventory")}
            className="!bg-[#3F3F3F] !border-none"
            fullWidth={false}
            prefix={<LeftOutlined />}
          />
          <Button
            text={
              inventoryShippingCart.length > 0
                ? "Shipping Cart (" + inventoryShippingCart.length + ")"
                : "Shipping Cart"
            }
            fullWidth={false}
            prefix={<ShoppingCartOutlined />}
            onClick={() =>
              router.push("/admin/new/material-transfer?materialType=inventory")
            }
          />
        </div>
        <div className="bg-primary rounded-lg p-3 md:p-5 mt-5 shadow-custom">
          <div className="md:flex justify-between gap-5 mb-5">
            <p className="hidden md:block text-left text-lg md:text-2xl font-semibold">
              Part # {details?.partNumber}{" "}
              <WarningOutlined className="!text-secondary" />{" "}
            </p>
            <div className="grid md:flex grid-cols-2 gap-3 md:gap-5">
              <p className="md:hidden text-left text-lg md:text-2xl font-semibold">
                Part # {details?.partNumber}{" "}
                <WarningOutlined className="!text-secondary" />{" "}
              </p>
              {/* <Button
              text="Delete"
              prefix={<DeleteOutlined />}
              fullWidth={false}
              onClick={() => setDeleteAssetPopup(true)}
              outlined
            /> */}
              <Button
                text="Edit Inventory"
                prefix={<EditOutlined />}
                fullWidth={false}
                className="!h-11"
                onClick={() => router.push(`/admin/inventory/${slug}/edit`)}
                outlined
              />
              <div className="md:hidden"></div>
              <Select
                value={null}
                name="actions"
                placeholder="More Actions"
                onChange={handleAction}
                className="!h-11 md:!min-w-52 secondary-select !text-white"
                suffixIcon={<DownOutlined style={{ color: "white" }} />}
                // onChange={handleActionsChange}
                options={options}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col md:flex-row gap-3 md:gap-5">
            <div className="border w-full min-h-10 md:w-2/12"></div>
            <div className="md:w-5/12 grid grid-cols-2">
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Part #
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.partNumber || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Received Date
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.receivedDate || "-"}
              </p>
              {/* <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Cost
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">-</p> */}

              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Quantity
              </p>

              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.quantity || "-"}
              </p>

              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Cost
              </p>

              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.cost || "-"}
              </p>

              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border">
                Description
              </p>
              <p className="p-2 md:px-3 md:py-2 border truncate">
                {details?.description || "-"}
              </p>
            </div>
            <div className="md:w-5/12 grid grid-cols-2">
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Site
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.site.site || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Vendor
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.vendor?.vendor || "-"}
              </p>
              {/* <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Category
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Sub-Category
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p> */}
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Tag ID
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.tagId || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Invoice #
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.invoiceNumber || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border">
                Status
              </p>
              <p className="p-2 md:px-3 md:py-2 border truncate">
                {details?.status
                  ? details.status === "damagedBeyondRepair"
                    ? "Damaged Beyond Repair"
                    : details.status === "outForRepair"
                    ? "Out for repair"
                    : details.status.charAt(0).toUpperCase() +
                      details.status.slice(1)
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Tabs data={data} superUsers={superUsers} setData={setData} slug={slug} />
    </div>
  ) : (
    <Spin size="large" spinning={true} className="text-center w-full !mt-80" />
  );
};

export default InventoryDetails;
