"use client";
import Button from "@/components/common/Button";
import {
  CloseCircleOutlined,
  LeftOutlined,
  LoginOutlined,
  LogoutOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Checkbox, message, Spin, Table, Tabs } from "antd";
import { Form, Formik } from "formik";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TextAreaField from "@/components/common/TextAreaField";
import { rigs } from "@/constants/rigsAndSystems";
import {
  cancelWorkOrder,
  completeWorkOrder,
  emailWorkOrder,
  endWorkOrder,
  getWorkOrderDetails,
  printWorkOrder,
  saveWorkOrder,
  startWorkOrder,
} from "app/services/workOrders";
import Documents from "./components/documents";
import Photos from "./components/photos";
import { getAdminsManagers } from "app/services/common";
import TextArea from "antd/es/input/TextArea";

const WorkOrdersDetail = () => {
  const [workOrder, setWorkOrder] = useState();
  const router = useRouter();
  const { slug } = useParams();
  const [superUsers, setSuperUsers] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [inspections, setInspections] = useState([]);

  const tabs = [
    {
      key: "photos",
      label: "Photos",
      children: (
        <Photos photos={workOrder?.dashboard?.image} setData={setWorkOrder} />
      ),
    },
    {
      key: "documents",
      label: "Documents",
      children: (
        <Documents
          documentsData={workOrder?.documents}
          setData={setWorkOrder}
          superUsers={superUsers}
        />
      ),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const { status, data } = await getWorkOrderDetails(slug);
      if (status === 200) {
        setWorkOrder(data?.data);
        setInspections(data?.data?.inspection);
      } else {
        message.error(data.message || "Failed to get work order details");
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
    getData();
  }, [slug]);

  const columns = [
    { title: "Inspection/Tasks", dataIndex: "inspection", key: "inspection" },
    {
      title: "Passed",
      dataIndex: "status",
      key: "passed",
      render: (status, record) => (
        <Checkbox
          // defaultChecked={status === "Passed"}
          className="rounded-checkbox"
          checked={status === "Passed"}
          onChange={(e) =>
            setInspections((prev) =>
              prev.map((item) =>
                item._id === record._id
                  ? { ...item, status: e.target.checked ? "Passed" : "" }
                  : item
              )
            )
          }
        />
      ),
    },
    {
      title: "Failed",
      dataIndex: "status",
      key: "failed",
      render: (status, record) => (
        <Checkbox
          defaultChecked={status === "Failed"}
          className="rounded-checkbox"
          checked={status === "Failed"}
          onChange={(e) =>
            setInspections((prev) =>
              prev.map((item) =>
                item._id === record._id
                  ? { ...item, status: e.target.checked ? "Failed" : "" }
                  : item
              )
            )
          }
        />
      ),
    },
    {
      title: "N/A",
      dataIndex: "status",
      key: "na",
      render: (status, record) => (
        <Checkbox
          defaultChecked={status === "N/A"}
          className="rounded-checkbox"
          checked={status === "N/A"}
          onChange={(e) =>
            setInspections((prev) =>
              prev.map((item) =>
                item._id === record._id
                  ? { ...item, status: e.target.checked ? "N/A" : "" }
                  : item
              )
            )
          }
        />
      ),
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      render: (comments, record) => (
        <TextArea
          name={"comments" + record._id}
          placeholder="Add Comments"
          maxLength={150}
          className="placeholder:!text-[#717171] resize-none !border-none"
          value={comments}
          onChange={(e) =>
            setInspections((prev) =>
              prev.map((item) =>
                item._id === record._id
                  ? { ...item, comments: e.target.value }
                  : item
              )
            )
          }
        />
      ),
    },
  ];

  const handleCancelWO = async () => {
    const { status, data } = await cancelWorkOrder(slug);
    if (status === 200) {
      message.success(data.message || "Work order cancelled successfully");
      router.push("/admin/work-orders");
    } else {
      message.error(data.message || "Failed to cancel work order");
    }
  };
  const handleSave = async () => {
    setSubmitting(true);
    const { status, data } = await saveWorkOrder(slug, {
      inspection: inspections,
    });
    if (status === 200) {
      message.success(data.message || "Work order saved successfully");
    } else {
      message.error(data.message || "Failed to save work order");
    }
    setSubmitting(false);
  };

  const handleStart = async () => {
    const { status, data } = await startWorkOrder(slug);
    if (status === 200) {
      message.success(data.message || "Work order started successfully");
      setWorkOrder({ ...workOrder, startTime: data?.data });
    } else {
      message.error(data.message || "Failed to start work order");
    }
  };

  const handleStop = async () => {
    const { status, data } = await endWorkOrder(slug);
    if (status === 200) {
      message.success(data.message || "Work order stopped successfully");
      setWorkOrder({ ...workOrder, endTime: data?.data });
    } else {
      message.error(data.message || "Failed to Stop work order");
    }
  };

  const handleComplete = async () => {
    const { status, data } = await completeWorkOrder(slug);
    if (status === 200) {
      message.success(data.message || "Work order completed successfully");
      router.push("/admin/work-orders");
    } else {
      message.error(data.message || "Failed to complete work order");
    }
  };

  return workOrder ? (
    <div>
      <div className="mx-5 md:mx-10">
        <p className="text-sm text-[#828282]">
          Work Order {" > "} Planned Work Order
        </p>
        <div className="flex justify-between mt-4">
          <Button
            text="Back to Work Orders"
            onClick={() => router.push("/admin/work-orders")}
            className="!bg-[#3F3F3F] !border-none"
            fullWidth={false}
            prefix={<LeftOutlined />}
          />
        </div>
      </div>
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 px-5 md:px-10">
        <div className="bg-primary shadow-custom rounded-lg p-4">
          <div className="flex flex-col gap-5">
            <h1 className="text-xl md:text-2xl font-bold">
              Asset: {workOrder?.asset.assetNumber}
            </h1>

            <p className="text-lg font-semibold">Maintenance Details</p>
            <div className="flex gap-5">
              <p className="min-w-32 mt-2">Asset Info.</p>
              <div className="grid md:grid-cols-2 gap-y-2 gap-x-5 w-full">
                <div className="grid grid-cols-2 border">
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                    Site
                  </p>
                  <p className="p-2 md:px-3 md:py-2">
                    {workOrder?.asset.site?.site || "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 border">
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                    System
                  </p>
                  <p className="p-2 md:px-3 md:py-2">
                    {workOrder?.asset.system?.system || "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 border">
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                    Category
                  </p>
                  <p className="p-2 md:px-3 md:py-2">
                    {workOrder?.asset.category?.category || "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 border">
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                    Sub-Category
                  </p>
                  <p className="p-2 md:px-3 md:py-2">
                    {workOrder?.asset.subCategory?.subCategory || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <p className="min-w-32 mt-2">Schedule</p>
              <div className="grid md:grid-cols-2 gap-y-2 gap-x-5 w-full">
                <div className="grid grid-cols-2 border">
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                    Start Date
                  </p>
                  <p className="p-2 md:px-3 md:py-2">
                    {workOrder?.date || "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 border">
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                    Schedule
                  </p>
                  <p className="p-2 md:px-3 md:py-2 capitalize">
                    {workOrder?.schedule || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <p className="min-w-32 mt-2">Criticality</p>
              <div className="grid md:grid-cols-2 gap-y-2 gap-x-5 w-full">
                <div className="grid grid-cols-2 border">
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                    Level
                  </p>
                  <p className="p-2 md:px-3 md:py-2">
                    {workOrder?.cricality || "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 border">
                  <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                    Created By
                  </p>
                  <p className="p-2 md:px-3 md:py-2 capitalize">
                    {workOrder?.createdBy || "-"}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg font-semibold">Procedures Lines</p>
            <Table
              // loading={workOrder ? true : false}
              size={"x-large"}
              scroll={{ x: 1100 }}
              columns={columns}
              dataSource={
                inspections
                // .map((i, index) => ({
                // ...i,
                // key: index, }))
              }
              pagination={false}
              className="[&_*]:text-[16px]"
              style={{ marginTop: 12, overflow: "auto" }}
            />
            <div className="flex justify-end gap-3 mb-5">
              {!["cancelled", "completed"].includes(workOrder?.status) && (
                <Button
                  text="Cancel Work Order"
                  prefix={<CloseCircleOutlined />}
                  fullWidth={false}
                  className="ml-3"
                  onClick={handleCancelWO}
                  disabled={isSubmitting}
                  outlined
                />
              )}
              {workOrder?.startTime === null ? (
                <Button
                  text="Start"
                  prefix={<LoginOutlined />}
                  fullWidth={false}
                  onClick={handleStart}
                  className="ml-3"
                />
              ) : (
                workOrder?.stopTime === null && (
                  <Button
                    text="Stop"
                    prefix={<LogoutOutlined />}
                    fullWidth={false}
                    onClick={handleStop}
                    className="ml-3"
                  />
                )
              )}
              {!["cancelled", "completed"].includes(workOrder?.status) && (
                <Button
                  text="Mark Completed"
                  prefix={<PlusOutlined />}
                  fullWidth={false}
                  onClick={handleComplete}
                  disabled={isSubmitting}
                  className="ml-3"
                />
              )}
              <Button
                text="Save Updates"
                prefix={<SaveOutlined />}
                fullWidth={false}
                onClick={handleSave}
                disabled={isSubmitting}
                className="ml-3"
              />
            </div>
          </div>
        </div>
        <div className="bg-primary shadow-custom rounded-lg p-4 mt-5">
          <Tabs
            defaultActiveKey={"photos"}
            animated
            items={tabs}
            className="select-none asset-tabs"
          />
        </div>
      </div>
    </div>
  ) : (
    <Spin size="large" spinning={true} className="text-center w-full !mt-80" />
  );
};

export default WorkOrdersDetail;
