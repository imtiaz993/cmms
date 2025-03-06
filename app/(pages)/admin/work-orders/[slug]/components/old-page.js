"use client";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  FolderFilled,
  LoginOutlined,
  LogoutOutlined,
  MailOutlined,
  PlusOutlined,
  PrinterFilled,
  SaveOutlined,
  WarningFilled,
} from "@ant-design/icons";
import {
  Badge,
  Card,
  Checkbox,
  Collapse,
  Dropdown,
  Menu,
  message,
  Radio,
  Table,
  Tooltip,
} from "antd";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddManHoursPopup from "./components/addManHoursPopup";
import AddCostPopup from "./components/addCostPopup";
import AddDelayReasonPopup from "./components/addDelayReasonPopup";
import AddPartPopup from "../../inventory/components/addPartPopup";
import UploadLinkDocPopup from "../../../../../components/uploadLinkDocPopup";
import UploadDocPopup from "../../../../../components/uploadDocPopup";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
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
  const [popup, setPopup] = useState();
  const [batchEdit, setBatchEdit] = useState(false);
  const [createUnplannedWO, setCreateUnplannedWO] = useState(false);
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

  const handleEmail = async () => {
    const { status, data } = await emailWorkOrder(slug);
    if (status === 200) {
      message.success(data.message || "Email sent successfully");
    } else {
      message.error(data.message || "Failed to send email");
    }
  };
  const handlePrint = async () => {
    const { status, data } = await printWorkOrder(slug);
    if (status === 200) {
      window.open(data.data);
      message.success(data.message || "Printed successfully");
    } else {
      message.error(data.message || "Failed to print");
    }
  };
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
      {workOrder && (
        <div className="p-7 overflow-auto h-[calc(100dvh-130px)]">
          <AddManHoursPopup
            visible={popup === "addManHours"}
            setVisible={setPopup}
            setWorkOrder={setWorkOrder}
            slug={slug}
          />
          <AddCostPopup
            visible={popup === "addCost"}
            setVisible={setPopup}
            setWorkOrder={setWorkOrder}
            slug={slug}
          />
          <AddDelayReasonPopup
            visible={popup === "addDelayReason"}
            setVisible={setPopup}
          />
          <AddPartPopup visible={popup === "addPart"} setVisible={setPopup} />
          <UploadLinkDocPopup
            visible={popup === "uploadLinkDocument"}
            setVisible={setPopup}
            workOrderSlug={slug}
            setDetails={setWorkOrder}
          />
          <UploadDocPopup
            visible={popup === "uploadDocument"}
            setVisible={setPopup}
            workOrderSlug={slug}
            setDetails={setWorkOrder}
          />
          <Formik
            initialValues={workOrder}
            onSubmit={(values, { setSubmitting }) => {
              handleSave(values, setSubmitting);
            }}
          >
            {({ isSubmitting, handleSubmit, submitForm }) => (
              <Form>
                <div className="flex justify-between gap-3 mb-5">
                  <Button
                    prefix={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    fullWidth={false}
                    outlined
                  />
                  <div className="">
                    <Button
                      text="Email"
                      prefix={<MailOutlined />}
                      fullWidth={false}
                      onClick={handleEmail}
                      outlined
                    />

                    <Button
                      text="Print"
                      prefix={<PrinterFilled />}
                      fullWidth={false}
                      className="ml-3"
                      onClick={handlePrint}
                      outlined
                    />

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
                    <Button
                      text="Save"
                      prefix={<SaveOutlined />}
                      fullWidth={false}
                      onClick={submitForm}
                      disabled={isSubmitting}
                      className="ml-3"
                    />
                    {!["cancelled", "completed"].includes(
                      workOrder?.status
                    ) && (
                      <Button
                        text="Complete"
                        prefix={<CheckCircleOutlined />}
                        fullWidth={false}
                        onClick={handleComplete}
                        disabled={isSubmitting}
                        className="ml-3"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-3/5">
                    <Card
                      loading={false}
                      className="!bg-primary"
                      title={
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-secondary rounded-full">
                            <FolderFilled />
                          </span>
                          TRF14687000001{" "}
                          <p className="text-xs font-normal">(Open) </p>
                          <Tooltip title="Created By System on October 9, 2024 at 10:00 AM GMT-7">
                            {" "}
                            <ExclamationCircleOutlined />
                          </Tooltip>
                        </div>
                      }
                      extra={
                        <p>
                          <span className="opacity-50 mr-2"> Priority: </span>{" "}
                          Critical <WarningFilled />
                        </p>
                      }
                    >
                      <div className="grid md:grid-cols-2 mx-2 gap-3">
                        <div>
                          <span className="opacity-70 mr-3">Cost Center</span>
                          <span className=""> Rig 23/Drilling Systems</span>
                        </div>
                        <div>
                          <span className="opacity-70 mr-3">Created Date</span>
                          <span className=""> {workOrder.createdAt}</span>
                        </div>
                        <div>
                          <span className="opacity-70 mr-3">Asset#</span>
                          <span className="">
                            {workOrder.asset.assetNumber}
                          </span>
                        </div>
                        <div>
                          <span className="opacity-70 mr-3">Due Date</span>
                          <span className="">{workOrder.date}</span>
                        </div>
                        <div>
                          <span className="opacity-70 mr-3">
                            Asset Description
                          </span>
                          <span className="">
                            {workOrder.asset.description}
                          </span>
                        </div>
                      </div>
                    </Card>
                    <Card
                      loading={false}
                      className="!bg-primary"
                      title={<div>Work Order Details</div>}
                      style={{ marginTop: "20px" }}
                    >
                      <div className="grid md:grid-cols-3 mx-2 gap-3">
                        <SelectField
                          name="companyDoingWork"
                          placeholder="Company Doing Work"
                          options={[
                            {
                              value: "noRam",
                              label: "No Ram",
                            },
                            {
                              value: "thirdParty",
                              label: "Third Party",
                            },
                          ]}
                          style={{ height: "36px" }}
                        />
                        <InputField
                          name="personDoingWork"
                          placeholder="Person Doing Work"
                        />
                      </div>
                      <p className="opacity-50 mr-2 mt-3">Comments</p>
                      <p>No Comments</p>
                      <div className="mt-3 -mb-4">
                        <TextAreaField
                          name="comments"
                          placeholder="Add Comment"
                          maxLength={150}
                        />
                      </div>
                      <Collapse style={{ marginTop: "20px" }}>
                        <Collapse.Panel header="View More Details" key="1">
                          {/* Main Container */}
                          <div className="flex justify-between p-4">
                            {/* Left Column */}
                            <div className="w-1/2 mr-5">
                              <div>
                                <p className="font-bold text-lg">Details</p>

                                <p>
                                  <span className="opacity-50 mr-2">
                                    Accounting Code{" "}
                                  </span>
                                  <span>-</span>
                                </p>
                                <p>
                                  <span className="opacity-50 mr-2">
                                    Parent Asset{" "}
                                  </span>
                                  <span>-</span>
                                </p>
                                <p>
                                  <span className="opacity-50 mr-2">
                                    Physical Location{" "}
                                  </span>
                                  <span>-</span>
                                </p>
                                <p>
                                  <span className="opacity-50 mr-2">
                                    Category{" "}
                                  </span>
                                  <span>Drilling Systems</span>
                                </p>
                                <p>
                                  <span className="opacity-50 mr-2">
                                    System{" "}
                                  </span>
                                  <span>Catwalk</span>
                                </p>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="w-1/2">
                              {/* Equipment Information Section */}
                              <p className="font-bold text-lg mt-4">
                                Equipment Information
                              </p>
                              <p>
                                <span className="opacity-50 mr-2">
                                  Manufacturer
                                </span>{" "}
                                <span>-</span>
                              </p>

                              <p>
                                <span className="opacity-50 mr-2">Make </span>{" "}
                                <span>{workOrder.asset.make}</span>
                              </p>

                              <p>
                                <span className="opacity-50 mr-2">Part #</span>{" "}
                                <span>{workOrder.asset.part}</span>
                              </p>
                              <p>
                                <span className="opacity-50 mr-2">Model #</span>{" "}
                                <span>{workOrder.asset.model}</span>
                              </p>

                              <p>
                                <span className="opacity-50 mr-2">
                                  Serial #
                                </span>{" "}
                                <span>{workOrder.asset.serialNumber}</span>
                              </p>
                            </div>
                          </div>
                        </Collapse.Panel>
                      </Collapse>
                    </Card>
                    <Card
                      loading={false}
                      className="!bg-primary"
                      style={{ marginTop: 20 }}
                    >
                      <div className="grid md:grid-cols-3 gap-4">
                        <SelectField
                          name="costCenter"
                          placeholder="Rig #"
                          options={rigs.map((i) => ({
                            label: i.name,
                            value: i.id,
                          }))}
                        />
                        <InputField
                          name="costCenter"
                          placeholder="Parent Asset"
                          maxLength={128}
                        />
                        <DatePickerField name="date" placeholder="Date" />
                        <SelectField
                          name="supervisor"
                          placeholder="Supervisor"
                          options={[
                            { value: "Supervisor 1", label: "Supervisor 1" },
                            { value: "Supervisor 2", label: "Supervisor 2" },
                            { value: "Supervisor 3", label: "Supervisor 3" },
                          ]}
                        />
                        <SelectField
                          name="inspectedBy"
                          placeholder="Inspected By"
                          options={[
                            { value: "Person 1", label: "Person 1" },
                            { value: "Person 2", label: "Person 2" },
                            { value: "Person 3", label: "Person 3" },
                          ]}
                        />
                        <div className="col-span-2">
                          <p className="mb-1">Recurring:</p>
                          <Field name="recurring">
                            {({ field }) => (
                              <Radio.Group {...field} className="xl:flex gap-2">
                                <Radio value="daily"> Daily</Radio>
                                <Radio value="weekly">Weekly</Radio>
                                <Radio value="monthly">Monthly</Radio>
                                <Radio value="yearly">Yearly</Radio>
                              </Radio.Group>
                            )}
                          </Field>
                        </div>
                      </div>
                    </Card>

                    <Card
                      loading={false}
                      className="!bg-primary"
                      title={
                        <div>
                          Procedures Lines <Badge count={5} />
                        </div>
                      }
                      style={{ marginTop: 20 }}
                    >
                      {(batchEdit || createUnplannedWO) && (
                        <div className="flex justify-between items-center mb-4">
                          <div>0 selected</div>
                          <div className="flex gap-3">
                            {batchEdit && (
                              <SelectField
                                name="status"
                                placeholder="Set Status To"
                                options={[
                                  { label: "Pending", value: "pending" },
                                  { label: "Completed", value: "completed" },
                                  { label: "N/A", value: "na" },
                                  { label: "Open", value: "open" },
                                  { label: "Unable", value: "unable" },
                                ]}
                              />
                            )}
                            <Button
                              text={
                                batchEdit
                                  ? "Apply"
                                  : createUnplannedWO && "Create Unplanned WO"
                              }
                              fullWidth={false}
                              style={{ padding: "4px 10px" }}
                              onClick={() => {
                                if (batchEdit) {
                                  message.success("Edited successfully");
                                } else {
                                  message.success(
                                    "Created Unplanned WO successfully"
                                  );
                                }
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex">
                        <p className="w-3/4">
                          {(batchEdit || createUnplannedWO) && <Checkbox />}{" "}
                          Inspection/Tasks
                        </p>
                        <p className="w-1/4">Feedback & Status</p>
                      </div>
                      <Card
                        loading={false}
                        style={
                          batchEdit || createUnplannedWO
                            ? { marginTop: 12, paddingTop: 12 }
                            : { marginTop: 12 }
                        }
                        className="relative"
                      >
                        <div className="col-span-2 grid grid-cols-12">
                          <p className="mb-1 col-span-8">
                            Safety training documented and posted in a central
                            location:
                          </p>
                          <Field name="safetyTrainingDocumented">
                            {({ field }) => (
                              <Radio.Group
                                {...field}
                                className="xl:!flex gap-2"
                              >
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no">No</Radio>
                                <Radio value="na">N/A</Radio>
                              </Radio.Group>
                            )}
                          </Field>
                        </div>
                        <p className="opacity-50 mr-2 mt-3">Comments</p>
                        <div className="mt-3 -mb-4">
                          <TextAreaField
                            name="procedureComments"
                            placeholder="Add Comment"
                            maxLength={150}
                          />
                        </div>
                      </Card>
                    </Card>
                  </div>
                  <div className="md:w-2/5">
                    <Card loading={false}>
                      <Image
                        src="/images/barcode.png"
                        alt="Barcode"
                        width={100}
                        height={100}
                        className="w-full"
                      />
                    </Card>

                    <Card
                      loading={false}
                      title={
                        <p>
                          Add Readings <Badge count={1} />
                        </p>
                      }
                      extra={
                        <Button
                          text="Add Readings"
                          fullWidth={false}
                          outlined
                          prefix={<PlusOutlined />}
                        />
                      }
                      style={{ marginTop: "20px" }}
                    >
                      <p className="text-center">
                        <ExclamationCircleOutlined /> No data to display.
                      </p>
                    </Card>

                    <Card
                      loading={false}
                      title={
                        <p>
                          Total Man Hours{" "}
                          <Badge count={workOrder.manHours.lenght} />
                        </p>
                      }
                      extra={
                        <>
                          <Button
                            text="View Details"
                            fullWidth={false}
                            outlined
                          />
                          <Button
                            text="Add Man Hours"
                            fullWidth={false}
                            outlined
                            className="ml-2"
                            prefix={<PlusOutlined />}
                            onClick={() => setPopup("addManHours")}
                          />
                        </>
                      }
                      style={{ marginTop: "20px" }}
                    >
                      {workOrder.manHours.length > 0 ? (
                        <Table
                          dataSource={workOrder.manHours}
                          size="small"
                          columns={[
                            {
                              title: "Performed By",
                              dataIndex: "performedBy",
                              key: "performedBy",
                            },
                            {
                              title: "Hours",
                              dataIndex: "manHours",
                              key: "manHours",
                            },
                            {
                              title: "Rate",
                              dataIndex: "rate",
                              key: "rate",
                            },
                            {
                              title: "Comment",
                              dataIndex: "comment",
                              key: "comment",
                            },
                            {
                              title: "Company Doing Work",
                              dataIndex: "companyDoingWork",
                              key: "companyDoingWork",
                            },
                          ]}
                          pagination={false}
                          style={{ overflow: "auto" }}
                        />
                      ) : (
                        <p className="text-center">
                          <ExclamationCircleOutlined /> No data to display.
                        </p>
                      )}
                    </Card>

                    <Card
                      loading={false}
                      title={
                        <p>
                          Total Cost <Badge count={workOrder.costs.lenght} />
                        </p>
                      }
                      extra={
                        <>
                          <Button
                            text="View Details"
                            fullWidth={false}
                            outlined
                          />
                          <Button
                            text="Add Cost"
                            fullWidth={false}
                            outlined
                            className="ml-2"
                            onClick={() => setPopup("addCost")}
                            prefix={<PlusOutlined />}
                          />
                        </>
                      }
                      style={{ marginTop: "20px" }}
                    >
                      {workOrder.costs.length > 0 ? (
                        <Table
                          dataSource={workOrder.costs}
                          size="small"
                          columns={[
                            {
                              title: "Cost Type",
                              dataIndex: "costType",
                              key: "costType",
                            },
                            {
                              title: "Currency",
                              dataIndex: "currency",
                              key: "currency",
                            },
                            {
                              title: "Item",
                              dataIndex: "item",
                              key: "item",
                            },
                            {
                              title: "Quantity",
                              dataIndex: "quantity",
                              key: "quantity",
                            },
                            {
                              title: "Description",
                              dataIndex: "description",
                              key: "description",
                            },
                          ]}
                          pagination={false}
                          style={{ overflow: "auto" }}
                        />
                      ) : (
                        <p className="text-center">
                          <ExclamationCircleOutlined /> No data to display.
                        </p>
                      )}
                    </Card>

                    <Card
                      loading={false}
                      title={
                        <p>
                          Parts Required{" "}
                          <Badge count={workOrder.parts.lenght} />
                        </p>
                      }
                      extra={
                        <>
                          <Button
                            text="View Details"
                            fullWidth={false}
                            outlined
                          />
                          <Button
                            text="Add Part"
                            fullWidth={false}
                            outlined
                            className="ml-2"
                            onClick={() => setPopup("addPart")}
                            prefix={<PlusOutlined />}
                          />
                        </>
                      }
                      style={{ marginTop: "20px" }}
                    >
                      <p className="text-center">
                        <ExclamationCircleOutlined /> No data to display.
                      </p>
                    </Card>

                    <Card
                      loading={false}
                      title={
                        <p>
                          Work Order Documents{" "}
                          <Badge count={workOrder.documents.length} />
                        </p>
                      }
                      extra={
                        <>
                          <Button
                            text="View Details"
                            fullWidth={false}
                            outlined
                          />
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
                                    onClick={() => setPopup("uploadDocument")}
                                  >
                                    Upload Document
                                  </Menu.Item>
                                  <Menu.Item
                                    key={1}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                    onClick={() =>
                                      setPopup("uploadLinkDocument")
                                    }
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
                              className="ml-2"
                              prefix={<PlusOutlined />}
                            />
                          </Dropdown>
                        </>
                      }
                      style={{ marginTop: "20px" }}
                    >
                      {workOrder.documents.length > 0 ? (
                        <Table
                          dataSource={workOrder.documents}
                          size="small"
                          columns={[
                            {
                              title: "Document Name",
                              dataIndex: "title",
                              key: "title",
                            },
                            {
                              title: "Document Type",
                              dataIndex: "type",
                              key: "type",
                            },

                            {
                              title: "Uploaded By",
                              dataIndex: "uploadedBy",
                              key: "uploadedBy",
                            },
                            {
                              title: "Uploaded Date",
                              dataIndex: "createdAt",
                              key: "createdAt",
                            },
                            {
                              title: "Description",
                              dataIndex: "description",
                              key: "description",
                            },
                            {
                              title: "",
                              dataIndex: "link",
                              key: "link",
                              render: (link) => (
                                <a href={link} target="_blank">
                                  <DownloadOutlined
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </a>
                              ),
                            },
                          ]}
                          pagination={false}
                          style={{ overflow: "auto" }}
                        />
                      ) : (
                        <p className="text-center">
                          <ExclamationCircleOutlined /> No data to display.
                        </p>
                      )}
                    </Card>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default WorkOrdersDetail;
