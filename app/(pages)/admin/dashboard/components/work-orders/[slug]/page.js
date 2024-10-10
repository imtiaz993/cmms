"use client";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  FolderFilled,
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
  Dropdown,
  Menu,
  message,
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

const WorkOrdersDetail = () => {
  const router = useRouter();
  const [popup, setPopup] = useState();
  const [batchEdit, setBatchEdit] = useState(false);
  const [createUnplannedWO, setCreateUnplannedWO] = useState(false);

  return (
    <div className="p-7 overflow-auto h-[calc(100dvh-77px)]">
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
                      MT14687000001{" "}
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
                    <Field as={Select} name="taskTo" placeholder="Task To" />
                    <Field
                      as={Select}
                      name="companyDoingWork"
                      placeholder="Company Doing Work"
                    />
                    <InputField
                      name="personDoingWork"
                      placeholder="Person Doing Work"
                    />
                    <InputField name="poNo" placeholder="PO #" />
                    <InputField name="jsa" placeholder="JSA" />
                  </div>
                  <p className="opacity-50 mr-2 mt-3">Comments</p>
                  <p>No Comments</p>
                  <Field
                    as={TextArea}
                    name="comment"
                    placeholder="Add Comment"
                    className="!mt-3"
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
                            <p>
                              <span className="opacity-50 mr-2">Tier 3 </span>
                              <span>CANRIG</span>
                            </p>
                            <p>
                              <span className="opacity-50 mr-2">Tier 4 </span>
                              <span>PC3000-26-360</span>
                            </p>
                            <p>
                              <span className="opacity-50 mr-2">Tier 5 </span>
                              <span>-</span>
                            </p>
                            <p>
                              <span className="opacity-50 mr-2">Tier 6 </span>
                              <span>-</span>
                            </p>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="w-1/2">
                          {/* Equipment Info Section */}
                          <div>
                            <p className="font-bold text-lg">Equipment Info</p>
                            <p>
                              <span className="opacity-50 mr-2">
                                Manufacturer{" "}
                              </span>
                              <span>-</span>
                            </p>

                            <p>
                              {" "}
                              <span className="opacity-50 mr-2">Model </span>
                              <span>-</span>
                            </p>
                          </div>

                          {/* Equipment Information Section */}
                          <p className="font-bold text-lg mt-4">
                            Equipment Information
                          </p>
                          <p>
                            <span className="opacity-50 mr-2">
                              Model Number
                            </span>{" "}
                            <span>-</span>
                          </p>

                          <p>
                            <span className="opacity-50 mr-2">Make </span>{" "}
                            <span>-</span>
                          </p>

                          <p>
                            <span className="opacity-50 mr-2">Model #</span>{" "}
                            <span>-</span>
                          </p>

                          <p>
                            <span className="opacity-50 mr-2">
                              Model Number
                            </span>{" "}
                            <span>-</span>
                          </p>

                          {/* Manufacture Information */}
                          <p className="font-bold text-lg mt-4">
                            Manufacture Information
                          </p>
                          <p>
                            <span className="opacity-50 mr-2">
                              Manufacturer
                            </span>{" "}
                            <span>CANRIG</span>
                          </p>

                          <p>
                            <span className="opacity-50 mr-2">Model</span>{" "}
                            <span>PC3000-26-360</span>
                          </p>
                        </div>
                      </div>
                    </Collapse.Panel>
                  </Collapse>
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
                  extra={
                    <div className="flex gap-2">
                      <Button
                        text="Batch Edit"
                        fullWidth={false}
                        outlined
                        onClick={() => {
                          setBatchEdit(!batchEdit);
                          setCreateUnplannedWO(false);
                        }}
                        style={{ padding: "4px 10px" }}
                      />
                      <Button
                        text={"Create Unplanned WO"}
                        // onClick={showAddWOModal}
                        outlined
                        onClick={() => {
                          setCreateUnplannedWO(!createUnplannedWO);
                          setBatchEdit(false);
                        }}
                        style={{ padding: "4px 10px" }}
                        prefix={<PlusOutlined />}
                      />
                    </div>
                  }
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
                      Procedure Lines
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
                    {(batchEdit || createUnplannedWO) && (
                      <Checkbox className="absolute top-1" />
                    )}
                    <div className="flex gap-3">
                      <div className="w-3/4 flex">
                        <div>
                          <div className="h-7 w-7 flex items-center justify-center rounded-full border border-secondary text-secondary mr-2">
                            1
                          </div>
                        </div>
                        <p>
                          1. Use a multi purpose lithium complex grease that
                          complies with N.L.G.I. Classification No. 1 or No. 2
                          to grease each grease zerk on the lift arm shaft
                        </p>
                      </div>
                      <div className="w-1/4">
                        <p>
                          No feedback available or applicable for this
                          procedure.
                        </p>
                        <div className="mt-3 overflow-hidden">
                          <Select
                            name="status"
                            placeholder="Status"
                            style={{ height: "36px", width: "100%" }}
                            options={[
                              { label: "Completed", value: "completed" },
                              { label: "N/A", value: "na" },
                              { label: "Open", value: "open" },
                              { label: "Unable", value: "unable" },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card
                    loading={false}
                    style={
                      batchEdit || createUnplannedWO
                        ? { marginTop: 12, paddingTop: 12 }
                        : { marginTop: 12 }
                    }
                  >
                    {(batchEdit || createUnplannedWO) && (
                      <Checkbox className="absolute top-1" />
                    )}
                    <div className="flex gap-3">
                      <div className="w-3/4 flex">
                        <div>
                          <div className="h-7 w-7 flex items-center justify-center rounded-full border border-secondary text-secondary mr-2">
                            1
                          </div>
                        </div>
                        <p>
                          1. Use a multi purpose lithium complex grease that
                          complies with N.L.G.I. Classification No. 1 or No. 2
                          to grease each grease zerk on the lift arm shaft
                        </p>
                      </div>
                      <div className="w-1/4">
                        <p>
                          No feedback available or applicable for this
                          procedure.
                        </p>
                        <div className="mt-3 overflow-hidden">
                          <Select
                            name="status"
                            placeholder="Status"
                            style={{ height: "36px", width: "100%" }}
                            options={[
                              { label: "Completed", value: "completed" },
                              { label: "N/A", value: "na" },
                              { label: "Open", value: "open" },
                              { label: "Unable", value: "unable" },
                            ]}
                          />
                        </div>
                      </div>
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
                      Delay reasons <Badge count={1} />
                    </p>
                  }
                  extra={
                    <>
                      <Button text="View Details" fullWidth={false} outlined />
                      <Button
                        text="Add Delay Reasons"
                        fullWidth={false}
                        outlined
                        className="ml-2"
                        onClick={() => setPopup("addDelayReason")}
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
                          <Menu style={{ background: "#4C4C4C" }}>
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

                <Card
                  loading={false}
                  title={
                    <p>
                      Realted Documents <Badge count={1} />
                    </p>
                  }
                  extra={
                    <>
                      <Button text="View Details" fullWidth={false} outlined />

                      <Dropdown
                        dropdownRender={() => (
                          <Menu style={{ background: "#4C4C4C" }}>
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
