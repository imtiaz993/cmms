"use client";

import Button from "@/components/common/Button";
import Tabs from "./components/tabs";
import {
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
import { getAssetDetails, updateStatus } from "app/services/assets";
import CreateAssetPopup from "../components/createAssetPopup";
import ConfirmationPopup from "@/components/confirmationPopup";
import { LinkBroken } from "@/icons/index";
import { getAdminsManagers } from "app/services/common";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingCart } from "app/redux/slices/assetsShippingCartSlice";

const AssetDetail = () => {
  const [data, setData] = useState();
  const [details, setDetails] = useState();
  const [editAssetPopup, setEditAssetPopup] = useState(false);
  const [actionPopup, setActionPopup] = useState(false);
  const router = useRouter();
  const { slug } = useParams();
  const [superUsers, setSuperUsers] = useState([]);
  const dispatch = useDispatch();
  const { assetsShippingCart } = useSelector(
    (state) => state.assetsShippingCart
  );

  useEffect(() => {
    const getAsset = async () => {
      const { status, data } = await getAssetDetails(slug);
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

  // const handleDelete = async () => {
  //   const { status, data } = await deleteAsset(slug);
  //   if (status === 200) {
  //     message.success(data?.message || "Asset deleted successfully");
  //     router.push("/admin/assets");
  //   } else {
  //     message.error(data?.message || "Failed to delete asset");
  //   }
  // };

  const options = [
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
          <SwapOutlined /> Add to shipping cart
        </p>
      ),
      value: "shippingCart",
    },
  ];

  const addToShippingCart = async () => {
    dispatch(updateShippingCart(details));
    message.success("Asset added to shipping cart");
  };

  const handleAction = (value) => {
    setActionPopup(value);
  };

  const handleActionConfirm = async () => {
    if (actionPopup === "workorder") {
      router.push(`/admin/new/work-order?Id=${slug}`);
    } else if (actionPopup === "shippingCart") {
      addToShippingCart();
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
        setDetails((prev) => ({ ...prev, maintStatus: actionPopup }));
      } else {
        message.error(data.error);
      }
    }
  };

  return (
    <>
      {data ? (
        <div className="overflow-auto h-[calc(100dvh-130px)]">
          <CreateAssetPopup
            visible={editAssetPopup}
            setVisible={setEditAssetPopup}
            assetId={slug}
            details={data}
            setDetails={setData}
          />

          {/* <ConfirmationPopup
        visible={deleteAssetPopup}
        setVisible={setDeleteAssetPopup}
        message="Are you sure you want to delete this asset?"
        onConfirm={handleDelete}
        onCancel={() => message.info("Delete action cancelled")}
      /> */}
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
              Assets {" > " + details?.assetID}
            </p>
            <div className="mt-4 mr-5 flex justify-between">
              <Button
                text="Back to Assets"
                onClick={() => router.push("/admin/assets")}
                className="!bg-[#3F3F3F] !border-none"
                fullWidth={false}
                prefix={<LeftOutlined />}
              />
              <Button
                text={
                  assetsShippingCart.length > 0
                    ? "Shipping Cart (" + assetsShippingCart.length + ")"
                    : "Shipping Cart"
                }
                fullWidth={false}
                prefix={<ShoppingCartOutlined />}
                onClick={() =>
                  router.push("/admin/new/material-transfer?materialType=asset")
                }
              />
            </div>
            <div className="bg-primary rounded-lg p-3 md:p-5 mt-5 shadow-custom">
              <div className="md:flex justify-between gap-5 mb-5">
                <p className="hidden md:block text-left text-lg md:text-2xl font-semibold">
                  {details?.assetID}{" "}
                  <WarningOutlined className="!text-secondary" />{" "}
                </p>
                <div className="grid md:flex grid-cols-2 gap-3 md:gap-5">
                  <p className="md:hidden text-left text-lg md:text-2xl font-semibold">
                    {details?.assetID}{" "}
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
                    text="Edit Asset"
                    prefix={<EditOutlined />}
                    fullWidth={false}
                    className="!h-11"
                    onClick={() => router.push(`/admin/assets/${slug}/edit`)}
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
                    Asset ID
                  </p>
                  <p className="p-2 md:px-3 md:py-2 border border-b-0">
                    {details?.assetID || "-"}
                  </p>
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                    Purchase Date
                  </p>
                  <p className="p-2 md:px-3 md:py-2 border border-b-0">
                    {details?.purchaseDate || "-"}
                  </p>
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                    Cost
                  </p>
                  <p className="p-2 md:px-3 md:py-2 border border-b-0">
                    {details?.cost || "-"}
                  </p>
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                    Brand
                  </p>
                  <p className="p-2 md:px-3 md:py-2 border border-b-0">
                    {details?.brand || "-"}
                  </p>
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                    Model
                  </p>

                  <p className="p-2 md:px-3 md:py-2 border border-b-0">
                    {details?.model || "-"}
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
                    System
                  </p>
                  <p className="p-2 md:px-3 md:py-2 border border-b-0">
                    {details?.system.system || "-"}
                  </p>
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                    Category
                  </p>
                  <p className="p-2 md:px-3 md:py-2 border border-b-0">
                    {details?.category.category || "-"}
                  </p>
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                    Sub-Category
                  </p>
                  <p className="p-2 md:px-3 md:py-2 border border-b-0">
                    {details?.subCategory.subCategory || "-"}
                  </p>
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border">
                    Status
                  </p>
                  <p className="p-2 md:px-3 md:py-2 border truncate">
                    {details?.maintStatus
                      ? details.maintStatus === "damagedBeyondRepair"
                        ? "Damaged Beyond Repair"
                        : details.maintStatus === "outForRepair"
                        ? "Out for repair"
                        : details.maintStatus.charAt(0).toUpperCase() +
                          details.maintStatus.slice(1)
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Tabs
            data={data}
            superUsers={superUsers}
            setData={setData}
            slug={slug}
          />
        </div>
      ) : (
        <Spin
          size="large"
          spinning={true}
          className="text-center w-full !mt-80"
        />
      )}
    </>
  );
};

export default AssetDetail;
