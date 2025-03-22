"use client";
import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import TimePickerField from "@/components/common/TimePickerField";
import { EditPagePencil } from "@/icons/index";
import * as Yup from "yup";
import {
  DeleteOutlined,
  EyeOutlined,
  LeftOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Checkbox, Form, message, Radio, Select, Table, Upload } from "antd";
import { getAssetDetails } from "app/services/assets";
import { getFilteredInventory } from "app/services/inventory";
import { ErrorMessage, Field, Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AssetDetailsPopup from "../../assets/components/assetDetailsPoup";
import { addUnplannedWorkOrder } from "app/services/workOrders";

const WorkOrderForm = () => {
  const router = useRouter();
  const [assetId, setAssetId] = useState(useSearchParams().get("Id"));
  const { assets, isLoading, error } = useSelector((state) => state.assets);
  // const locations = useSelector((state) => state.location.location);

  const [partsLoading, setPartsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [assetDetails, setAssetDetails] = useState();
  const [assetDetailsPopup, setAssetDetailsPopup] = useState(false);
  const [selectedParts, setSelectedParts] = useState([]);
  const handleIncrease = (record) => {
    setSelectedParts((prevData) =>
      prevData.map((item) =>
        item._id === record._id
          ? {
              ...item,
              selectedQuantity: item.selectedQuantity + 1,
            }
          : item
      )
    );
  };

  const handleDecrease = (record) => {
    setSelectedParts((prevData) =>
      prevData.map((item) =>
        item._id === record._id && item.selectedQuantity > 1
          ? {
              ...item,
              selectedQuantity: item.selectedQuantity - 1,
            }
          : item
      )
    );
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };
  const mainColumns = [
    {
      title: "Asset #",
      dataIndex: "assetID",
      key: "assetID",
      render: (_, record) => (
        <Link
          href={"/admin/assets/" + record._id}
          className="text-[#017BFE] underline"
        >
          {record.assetID}
        </Link>
      ),
    },
    {
      title: "Main System",
      dataIndex: "system",
      key: "mainSystem",
      render: (system) => system.system,
    },
    { title: "Serial #", dataIndex: "serialNumber", key: "serialNumber" },
    { title: "Model", dataIndex: "model", key: "model" },
    { title: "Priority", dataIndex: "criticality", key: "criticality" },
    {
      title: "Status",
      dataIndex: "maintStatus",
      key: "maintStatus",
      render: (status) => {
        if (status === "damagedBeyondRepair") {
          return "Damaged Beyond Repair";
        } else if (status === "outForRepair") {
          return "Out for repair";
        } else {
          return status.charAt(0).toUpperCase() + status.slice(1);
        }
      },
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
  ];
  const columns = [
    {
      title: "Part #",
      dataIndex: "partNumber",
      key: "partNumber",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Location",
      dataIndex: "site",
      key: "site",
      render: (site) => site.site,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Select Quantity",
      dataIndex: "selectedQuantity",
      key: "selectedQuantity",
      render: (_, record) => (
        <span className="flex items-center">
          <Button
            text="-"
            onClick={() => handleDecrease(record)}
            className="!text-black"
            style={{
              height: "26px",
              fontSize: "18px",
              minWidth: "10px",
              width: "10px",
            }}
          />
          <p className="font-bold mx-3">{record.selectedQuantity || 0}</p>
          <Button
            text="+"
            onClick={() => {
              if (record.quantity > record.selectedQuantity) {
                handleIncrease(record);
              }
            }}
            className="!text-black"
            style={{
              height: "26px",
              fontSize: "18px",
              minWidth: "10px",
              width: "10px",
            }}
          />
        </span>
      ),
    },
  ];

  const parts = [
    {
      part: "Part 1",
      description: "Description 1",
      location: "Location 1",
      quantity: 10,
      selectedQuantity: 0,
    },
    {
      part: "Part 2",
      description: "Description 2",
      location: "Location 2",
      quantity: 10,
      selectedQuantity: 0,
    },
    {
      part: "Part 3",
      description: "Description 3",
      location: "Location 3",
      quantity: 10,
      selectedQuantity: 0,
    },
  ];

  useEffect(() => {
    let specificAsset = assets?.filter((item) => item._id == assetId);
    setAssetDetails(specificAsset);
  }, [assets, assetId]);

  useEffect(() => {
    const fetchFilteredInventory = async () => {
      // try {
      const { status, data } = await getFilteredInventory({
        site: assetDetails[0].site._id,
      });

      if (status === 200) {
        setFilteredInventory(data.data);
      } else {
        message.error(data?.error || "Failed to fetch filtered inventory");
      }
      // } catch (error) {
      //   message.error("Error fetching filtered inventory");
      // } finally {
      // }
    };
    console.log("assetDetails", assetDetails);

    assetDetails && assetDetails.length > 0 && fetchFilteredInventory();
  }, [assetDetails]);

  const handleSubmit = async (values) => {
    console.log("Values1", values);

    const formData = new FormData();
    formData.append("asset", assetId);

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "workOrderDocuments" && key !== "workOrderImages") {
        formData.append(key, value);
      }
    });

    // selectedParts.forEach((part, index) => {
    //   formData.append(`selectedParts[${index}][_id]`, part._id);
    //   formData.append(
    //     `selectedParts[${index}][partNumber]`,
    //     part.partNumber
    //   );
    //   formData.append(
    //     `selectedParts[${index}][selectedQuantity]`,
    //     part.selectedQuantity
    //   );
    // });

    formData.append(
      "selectedParts",
      JSON.stringify(
        selectedParts.map((item) => {
          return {
            _id: item._id,
            partNumber: item.partNumber,
            selectedQuantity: item.selectedQuantity,
          };
        })
      )
    );

    values.workOrderDocuments?.length > 0 &&
      values.workOrderDocuments.forEach((file) => {
        formData.append(`workOrderDocuments`, file.originFileObj);
      });

    values.workOrderImages?.length > 0 &&
      values.workOrderImages.forEach((file) => {
        formData.append(`workOrderImages`, file.originFileObj);
      });
    console.log("FormData Entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    const { status, data } = await addUnplannedWorkOrder(formData);
    console.log("Status and Data:", status, data);
    if (status === 200) {
      message.success(data.message);
      router.push("/admin/work-orders");
    } else {
      message.error(data.error ?? "Failed to add work order");
    }
  };

  return (
    <div className="px-5 md:px-10">
      <p className="text-sm text-[#828282]">
        Work Order {" > "} Unplanned Work Order
      </p>
      <Button
        text="Back to Assets"
        onClick={() => router.push("/admin/assets")}
        className="mt-4 !bg-[#3F3F3F] !border-none"
        fullWidth={false}
        prefix={<LeftOutlined />}
      />
      <AssetDetailsPopup
        visible={assetDetailsPopup}
        setVisible={setAssetDetailsPopup}
        asset={assetDetailsPopup}
      />
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
        <p className="text-2xl font-semibold mb-5">Unplanned Work Order Form</p>

        <Formik
          initialValues={{
            asset: assetId ?? "",
          }}
          validationSchema={Yup.object().shape({
            asset: Yup.string().required("Asset is required"),
            issueID: Yup.string().required("Issue ID is required"),
            description: Yup.string().required("Description is required"),
            date: Yup.date().required("Date is required"),
            completionDate: Yup.date().min(
              Yup.ref("date"),
              "Completion Date must be after Date"
            ),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, values, isSubmitting, setFieldValue, submitForm }) => {
            // useEffect(() => {
            //   const filtered = filteredInventory
            //     .filter((item) => values?.parts?.includes(item.partNumber))
            //     .map((item) => ({
            //       ...item,
            //       selectedQuantity: item.selectedQuantity ?? 1,
            //     }));

            //   setSelectedParts(filtered);
            // }, [values.parts, filteredInventory]);

            return (
              <Form>
                <>
                  {console.log(
                    "sssssss",
                    filteredInventory.filter((item) =>
                      values?.parts?.includes(item.partNumber)
                    )
                  )}
                </>
                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  <p className="md:col-span-2 font-semibold md:text-lg">
                    Asset Details
                  </p>
                  <div className={`w-full sm:flex items-center gap-3`}>
                    <label
                      className={`text-sm flex gap-1 items-center sm:justify-end sm:min-w-[115px]`}
                    >
                      Asset
                      <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        name="asset"
                        placeholder="Asset"
                        value={assetId}
                        style={{ height: "44px", width: "100%" }}
                        size="large"
                        options={assets.map((i) => ({
                          label: i.assetID,
                          value: i._id,
                        }))}
                        onChange={(value) => {
                          setAssetId(value);
                          setFieldValue("asset", value);
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                      <ErrorMessage
                        name="asset"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  <div className="hidden md:block"></div>
                  {console.log("assetId ", assetId)}
                  <Table
                    loading={!assets || isLoading}
                    size="large"
                    scroll={{ x: 800 }}
                    columns={mainColumns}
                    className="md:col-span-2"
                    rowKey="_id"
                    dataSource={assetDetails}
                    pagination={false}
                    style={{
                      overflow: "auto",
                      marginTop: 5,
                    }}
                  />
                  <p className="md:col-span-2 font-semibold md:text-lg">
                    Work Order Details
                  </p>
                  <InputField
                    required
                    name="issueID"
                    placeholder="Issue ID"
                    label="Issue ID"
                  />
                  <div className="hidden md:block"></div>
                  <DatePickerField name="date" label="Date" required />
                  <TimePickerField name="time" label="Time" />
                  <div className="md:col-span-2">
                    <TextAreaField
                      name="description"
                      label="Description"
                      placeholder="Enter Description..."
                      required
                    />
                  </div>
                  <div className="md:col-span-2 sm:flex items-center">
                    <label className="text-sm sm:text-right sm:min-w-[115px]">
                      Priority Level
                    </label>
                    <Field name="criticality">
                      {({ field, form }) => (
                        <Radio.Group {...field} className="">
                          <Radio value="Critical" className="!ml-3">
                            Critical
                          </Radio>
                          <Radio value="High" className="sm:!ml-7">
                            High
                          </Radio>
                          <Radio value="Medium" className="sm:!ml-7">
                            Medium
                          </Radio>
                          <Radio value="Low" className="sm:!ml-7">
                            Low
                          </Radio>
                        </Radio.Group>
                      )}
                    </Field>
                  </div>

                  <InputField
                    name="technician"
                    label="Technician"
                    placeholder="Select Technician..."
                  />
                  <InputField
                    name="equipment"
                    label="Equipment"
                    placeholder="Enter equipment..."
                  />
                  <div className="w-full sm:flex items-center gap-3">
                    <label
                      className={`text-sm flex gap-1 items-center ${"sm:justify-end sm:min-w-[115px]"}`}
                    >
                      Parts
                    </label>
                    <Select
                      name="parts"
                      // label="Parts"
                      placeholder="Select Parts..."
                      mode="multiple"
                      options={filteredInventory.map((i) => ({
                        value: i.partNumber,
                        label: `part # ${i.partNumber}`,
                      }))}
                      onChange={(values) => {
                        const filtered = filteredInventory
                          .filter((item) => values.includes(item.partNumber))
                          .map((item) => ({
                            ...item,
                            selectedQuantity: item.selectedQuantity ?? 1,
                          }));

                        setSelectedParts(filtered);
                      }}
                      style={{
                        height: "44px",
                        width: "100%",
                      }}
                    />
                  </div>
                  <></>

                  <Table
                    loading={partsLoading}
                    size={"large"}
                    scroll={{ x: 700 }}
                    columns={columns}
                    rowKey="_id"
                    dataSource={selectedParts}
                    style={{
                      overflow: "auto",
                    }}
                    className="md:col-span-2 md:pl-32"
                  />

                  <p className="md:col-span-2 font-semibold md:text-lg">
                    Closure & Documentation
                  </p>
                  <div className="md:col-span-2">
                    <TextAreaField
                      name="repairActionTaken"
                      label="Repair Action Taken"
                      placeholder="Repair Action Taken..."
                    />
                  </div>
                  {/* <InputField
                    name="partsReplaced"
                    label="Parts Replaced"
                    placeholder="Enter Parts..."
                  /> */}

                  <InputField
                    name="finalStatus"
                    label="Final Status"
                    placeholder="Select Status..."
                  />
                  <DatePickerField name="completionDate" label="Completion" />

                  {/* <SelectField
                    name="site"
                    label="Site"
                    placeholder="Site"
                    className="!w-full"
                    options={locations.map((i) => ({
                      label: i.site,
                      value: i._id,
                    }))}
                  /> */}
                  {/* <div className="md:col-span-2">
                    <TextAreaField
                      name="summary"
                      label="Summary"
                      placeholder="Enter Summary..."
                    />
                  </div> */}
                  <div className="md:col-span-2 sm:flex items-center">
                    <label className="text-sm sm:text-right sm:min-w-[115px]">
                      Maint. Status
                    </label>
                    <Field name="status">
                      {({ field, form }) => (
                        <Radio.Group {...field} className="">
                          <Radio value="active" className="!ml-3">
                            Active
                          </Radio>
                          <Radio
                            value="damagedBeyondRepair"
                            className="sm:!ml-7"
                          >
                            Damaged Beyond Repair
                          </Radio>
                          <Radio value="outForRepair" className="sm:!ml-7">
                            Out for Repair
                          </Radio>
                          <Radio value="damaged" className="sm:!ml-7">
                            Damaged
                          </Radio>
                          <Radio value="disposed" className="sm:!ml-7">
                            Disposed
                          </Radio>
                          <Radio value="sell" className="sm:!ml-7">
                            Sell
                          </Radio>
                          <Radio value="broken" className="sm:!ml-7">
                            Broken
                          </Radio>
                        </Radio.Group>
                      )}
                    </Field>
                  </div>
                  <p className="md:col-span-2 font-semibold md:text-lg">
                    Upload Image
                  </p>
                  <div className={`w-full flex gap-3`}>
                    <label className="text-sm text-right min-w-[115px] mt-3">
                      Upload
                    </label>
                    <Upload
                      beforeUpload={() => {
                        return false;
                      }}
                      onChange={(info) => {
                        const updatedFileList = info.fileList;

                        if (info.file.status === "removed") {
                          setFieldValue(
                            "workOrderImages",
                            values.workOrderImages.filter(
                              (f) => f.uid !== info.file.uid
                            )
                          );
                        } else {
                          setFieldValue("workOrderImages", updatedFileList);
                        }
                      }}
                      fileList={values.workOrderImages || []}
                      accept="image/*"
                      multiple
                    >
                      <Button
                        className="!bg-green-600 !shadow-custom !border-white"
                        fullWidth={false}
                        prefix={<UploadOutlined />}
                        text="Choose Image"
                      />
                    </Upload>
                  </div>
                  <p className="md:col-span-2 font-semibold md:text-lg">
                    Upload Document
                  </p>
                  <div className={`w-full flex gap-3`}>
                    <label className="text-sm text-right min-w-[115px] mt-3">
                      Upload
                    </label>
                    <Upload
                      beforeUpload={() => {
                        return false;
                      }}
                      onChange={(info) => {
                        const updatedFileList = info.fileList;

                        if (info.file.status === "removed") {
                          setFieldValue(
                            "workOrderDocuments",
                            values.workOrderDocuments.filter(
                              (f) => f.uid !== info.file.uid
                            )
                          );
                        } else {
                          setFieldValue("workOrderDocuments", updatedFileList);
                        }
                      }}
                      fileList={values.workOrderDocuments || []}
                      accept="file/*"
                      multiple
                    >
                      <Button
                        className="!bg-green-600 !shadow-custom !border-white"
                        fullWidth={false}
                        prefix={<UploadOutlined />}
                        text="Choose Document"
                      />
                    </Upload>
                  </div>
                </div>
                <div className="text-right mt-5 mb-5">
                  {/* <Button
                    className="mr-2 !text-[#24A148] border-[#24A148] !bg-white"
                    onClick={() => router.push("/admin/work-orders")}
                    outlined
                    size="small"
                    text="Mark Completed"
                    fullWidth={false}
                    disabled={isSubmitting}
                  /> */}
                  <Button
                    className="mr-2 !text-base"
                    htmlType="submit"
                    // isLoading={isSubmitting}
                    onClick={submitForm}
                    // disabled={isSubmitting}
                    size="small"
                    text="Create Work order"
                    fullWidth={false}
                  />
                </div>
                {console.log("errors: ", errors)}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default WorkOrderForm;
