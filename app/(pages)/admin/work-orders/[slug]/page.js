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
import { Checkbox, message, Table } from "antd";
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

const WorkOrdersDetail = () => {
  const [workOrder, setWorkOrder] = useState();
  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    const getData = async () => {
      const { status, data } = await getWorkOrderDetails(slug);
      if (status === 200) {
        setWorkOrder(data?.data);
      } else {
        message.error(data.message || "Failed to get work order details");
      }
    };
    getData();
  }, []);

  const inspections = [
    {
      inspection:
        "Safety training documented and posted in a central location:",
      status: "Passed",
      comments: "",
    },
    {
      inspection:
        "Safety training documented and posted in a central location:",
      status: "Failed",
      comments: "",
    },
    {
      inspection:
        "Safety training documented and posted in a central location:",
      status: "N/A",
      comments: "",
    },
  ];

  const columns = [
    { title: "Inspection/Tasks", dataIndex: "inspection", key: "inspection" },
    {
      title: "Passed",
      dataIndex: "status",
      key: "passed",
      render: (status) => (
        <Checkbox
          defaultChecked={status === "Passed"}
          className="rounded-checkbox"
        />
      ),
    },
    {
      title: "Failed",
      dataIndex: "status",
      key: "failed",
      render: (status) => (
        <Checkbox
          defaultChecked={status === "Failed"}
          className="rounded-checkbox"
        />
      ),
    },
    {
      title: "N/A",
      dataIndex: "status",
      key: "na",
      render: (status) => (
        <Checkbox
          defaultChecked={status === "N/A"}
          className="rounded-checkbox"
        />
      ),
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      render: (comments) => (
        <TextAreaField
          name="comments"
          placeholder="Add Comments"
          maxLength={150}
          className="!resize-none !border-none"
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
  const handleSave = async (values, setSubmitting) => {
    console.log("values on save", values);
    const { status, data } = await saveWorkOrder(slug, values);
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

  return (
    <>
      {
        <div className="ml-5 md:ml-10">
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
          <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
            <Formik
              initialValues={workOrder}
              onSubmit={(values, { setSubmitting }) => {
                handleSave(values, setSubmitting);
              }}
            >
              {({ isSubmitting, handleSubmit, submitForm }) => (
                <Form>
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
                          <p className="p-2 md:px-3 md:py-2">{"-"}</p>
                        </div>
                        <div className="grid grid-cols-2 border">
                          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                            Location
                          </p>
                          <p className="p-2 md:px-3 md:py-2">{"-"}</p>
                        </div>
                        <div className="grid grid-cols-2 border">
                          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                            Category
                          </p>
                          <p className="p-2 md:px-3 md:py-2">{"-"}</p>
                        </div>
                        <div className="grid grid-cols-2 border">
                          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                            Sub-Category
                          </p>
                          <p className="p-2 md:px-3 md:py-2">{"-"}</p>
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
                            {workOrder?.startTime}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 border">
                          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                            Schedule
                          </p>
                          <p className="p-2 md:px-3 md:py-2 capitalize">
                            {workOrder?.recurring}
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
                            {workOrder?.priorityLevel}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 border">
                          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                            Created By
                          </p>
                          <p className="p-2 md:px-3 md:py-2 capitalize">
                            {workOrder?.createdBy}
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
                      {!["cancelled", "completed"].includes(
                        workOrder?.status
                      ) && (
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
                      {!["cancelled", "completed"].includes(
                        workOrder?.status
                      ) && (
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
                        onClick={submitForm}
                        disabled={isSubmitting}
                        className="ml-3"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      }
    </>
  );
};

export default WorkOrdersDetail;
