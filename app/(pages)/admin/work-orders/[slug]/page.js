"use client";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  FolderFilled,
  LoginOutlined,
  MailOutlined,
  PlusOutlined,
  PrinterFilled,
  WarningFilled,
} from "@ant-design/icons";
import {
  Badge,
  Card,
  Checkbox,
  Collapse,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  message,
  Radio,
  Select,
  Tooltip,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddManHoursPopup from "./components/addManHoursPopup";
import AddCostPopup from "./components/addCostPopup";
import AddDelayReasonPopup from "./components/addDelayReasonPopup";
import AddPartPopup from "../../inventory/components/addPartPopup";
import UploadLinkDocPopup from "../../material-transfer/[slug]/uploadLinkDocPopup";
import UploadDocPopup from "../../material-transfer/[slug]/uploadDocPopup";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";

const WorkOrdersDetail = () => {
  const router = useRouter();
  const [popup, setPopup] = useState();
  const [batchEdit, setBatchEdit] = useState(false);
  const [createUnplannedWO, setCreateUnplannedWO] = useState(false);

  return (
    <div className="p-7 overflow-auto h-[calc(100dvh-130px)]">
      <AddManHoursPopup
        visible={popup === "addManHours"}
        setVisible={setPopup}
      />
      <AddCostPopup visible={popup === "addCost"} setVisible={setPopup} />
      <AddDelayReasonPopup
        visible={popup === "addDelayReason"}
        setVisible={setPopup}
      />
      <AddPartPopup visible={popup === "addPart"} setVisible={setPopup} />
      <UploadLinkDocPopup
        visible={popup === "uploadLinkDocument"}
        setVisible={setPopup}
      />
      <UploadDocPopup
        visible={popup === "uploadDocument"}
        setVisible={setPopup}
      />
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
            onClick={() => message.info("Email will be available soon.")}
            outlined
          />

          <Button
            text="Print"
            prefix={<PrinterFilled />}
            fullWidth={false}
            className="ml-3"
            onClick={() => message.info("Print will be available soon.")}
            outlined
          />

          <Button
            text="Cancel Work Order"
            prefix={<CloseCircleOutlined />}
            fullWidth={false}
            className="ml-3"
            outlined
          />
          <Button
            text="Start"
            prefix={<LoginOutlined />}
            fullWidth={false}
            className="ml-3"
          />
          <Button
            text="Complete"
            prefix={<CheckCircleOutlined />}
            fullWidth={false}
            className="ml-3"
          />
        </div>
      </div>
      <Formik initialValues={{}}>
        {({ isSubmitting, handleSubmit }) => (
          <Form>
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
                      <span className=""> Today</span>
                    </div>
                    <div>
                      <span className="opacity-70 mr-3">Asset#</span>
                      <span className="">3000-30211</span>
                    </div>
                    <div>
                      <span className="opacity-70 mr-3">Due Date</span>
                      <span className="">October 11, 2024</span>
                    </div>
                    <div>
                      <span className="opacity-70 mr-3">Asset Description</span>
                      <span className="">Canrig Catwalk</span>
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
                  <Field
                    as={Input.TextArea}
                    name="comment"
                    placeholder="Add Comment"
                    className="!mt-3 !border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
                  />
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
                              <span className="opacity-50 mr-2">Category </span>
                              <span>Drilling Systems</span>
                            </p>
                            <p>
                              <span className="opacity-50 mr-2">System </span>
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
                            <span>CANRIG</span>
                          </p>

                          <p>
                            <span className="opacity-50 mr-2">Make </span>{" "}
                            <span>-</span>
                          </p>

                          <p>
                            <span className="opacity-50 mr-2">Part #</span>{" "}
                            <span>-</span>
                          </p>
                          <p>
                            <span className="opacity-50 mr-2">Model #</span>{" "}
                            <span>PC3000-26-360</span>
                          </p>

                          <p>
                            <span className="opacity-50 mr-2">Serial #</span>{" "}
                            <span>-</span>
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
                    <Select
                      name="costCenter"
                      placeholder="Rig #"
                      maxLength={128}
                      style={{ height: "36px" }}
                      options={[
                        { value: "Rig 21", label: "Rig 21" },
                        { value: "Rig 22", label: "Rig 22" },
                        { value: "Rig 23", label: "Rig 23" },
                      ]}
                    />
                    <InputField
                      name="costCenter"
                      placeholder="Parent Asset"
                      maxLength={128}
                    />
                    <DatePickerField
                      name="createdDateRange"
                      placeholder="Date"
                    />
                    <Select
                      name="costCenter"
                      placeholder="Supervisor"
                      maxLength={128}
                      style={{ height: "36px" }}
                      options={[
                        { value: "Supervisor 1", label: "Supervisor 1" },
                        { value: "Supervisor 2", label: "Supervisor 2" },
                        { value: "Supervisor 3", label: "Supervisor 3" },
                      ]}
                    />
                    <Select
                      name="costCenter"
                      placeholder="Inspected By"
                      maxLength={128}
                      style={{ height: "36px" }}
                      options={[
                        { value: "Person 1", label: "Person 1" },
                        { value: "Person 2", label: "Person 2" },
                        { value: "Person 3", label: "Person 3" },
                      ]}
                    />
                    <div className="col-span-2">
                      <p className="mb-1">Recurring:</p>
                      <div role="group">
                        <label className="mr-4">
                          <Radio value="pdf" className="mr-2" />
                          Daily
                        </label>
                        <label className="mr-4">
                          <Radio value="csv" className="mr-2" />
                          Weekly
                        </label>
                        <label className="mr-4">
                          <Radio value="csv" className="mr-2" />
                          Monthly
                        </label>
                        <label className="mr-4">
                          <Radio value="csv" className="mr-2" />
                          Yearly
                        </label>
                      </div>
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
                          <Select
                            placeholder="Set Status To"
                            style={{ height: "36px", width: "100%" }}
                            options={[
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
                      <div role="group" className="col-span-4">
                        <Checkbox>YES</Checkbox>
                        <Checkbox>No</Checkbox>
                        <Checkbox>N/A</Checkbox>
                      </div>
                    </div>
                    <p className="opacity-50 mr-2 mt-3">Comments</p>
                    <Field
                      as={Input.TextArea}
                      name="comment"
                      placeholder="Add Comment"
                      className="!mt-3 !border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
                    />
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
                      Total Man Hours <Badge count={1} />
                    </p>
                  }
                  extra={
                    <>
                      <Button text="View Details" fullWidth={false} outlined />
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
                  <p className="text-center">
                    <ExclamationCircleOutlined /> No data to display.
                  </p>
                </Card>

                <Card
                  loading={false}
                  title={
                    <p>
                      Total Cost <Badge count={1} />
                    </p>
                  }
                  extra={
                    <>
                      <Button text="View Details" fullWidth={false} outlined />
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
                  <p className="text-center">
                    <ExclamationCircleOutlined /> No data to display.
                  </p>
                </Card>

                <Card
                  loading={false}
                  title={
                    <p>
                      Parts Required <Badge count={1} />
                    </p>
                  }
                  extra={
                    <>
                      <Button text="View Details" fullWidth={false} outlined />
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
                      Work Order Documents <Badge count={1} />
                    </p>
                  }
                  extra={
                    <>
                      <Button text="View Details" fullWidth={false} outlined />
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
                                onClick={() => setPopup("uploadLinkDocument")}
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
                  <p className="text-center">
                    <ExclamationCircleOutlined /> No data to display.
                  </p>
                </Card>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WorkOrdersDetail;
