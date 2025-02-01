"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Radio, Table } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { getAssetDetails, updateAsset } from "app/services/assets";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import TextAreaField from "@/components/common/TextAreaField";
import { rigs } from "@/constants/rigsAndSystems";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getFields } from "app/services/customFields";
import { LeftOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Asset #",
    dataIndex: "assetNumber",
    key: "assetNumber",
    render: (assetNumber) => (
      <a className="text-[#017BFE] underline">{assetNumber}</a>
    ),
  },
  { title: "Category", dataIndex: "category", key: "category" },
  { title: "Start Date", dataIndex: "startDate", key: "startDate" },
  { title: "Criticality", dataIndex: "criticality", key: "criticality" },
  { title: "Status", dataIndex: "maintStatus", key: "maintStatus" },
];

const AssetForm = () => {
  const { slug } = useParams();
  const [details, setDetails] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { assets, isLoading, error } = useSelector((state) => state.assets);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  useEffect(() => {
    const getAsset = async () => {
      const { status, data } = await getAssetDetails(slug);
      if (status === 200) {
        console.log(data);
        setDetails(data?.data);
      } else {
        message.error(data?.message || "Failed to fetch data");
      }
    };

    const handleFetchFields = async () => {
      const { status, data } = await getFields("assets");
      if (status === 200) {
        setFields(data.data);
      } else {
        message.error(data.error);
      }
      setLoading(false);
    };

    slug && getAsset();
    slug && handleFetchFields();
  }, [slug]);

  const customFieldInitialValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.uniqueKey] = "";
      return acc;
    }, {});
  }, [fields]);

  const customFieldValidations = useMemo(() => {
    return fields.reduce((acc, field) => {
      switch (field.type) {
        case "text":
        case "dropdown":
          acc[field.uniqueKey] = Yup.string().required(
            `${field.name} is required`
          );
          break;
        case "number":
          acc[field.uniqueKey] = Yup.number()
            .typeError(`${field.name} must be a number`)
            .required(`${field.name} is required`);
          break;
        case "date":
          acc[field.uniqueKey] = Yup.date()
            .typeError(`${field.name} must be a valid date`)
            .required(`${field.name} is required`);
          break;
        default:
          acc[field.uniqueKey] = Yup.string().required(
            `${field.name} is required`
          );
      }
      return acc;
    }, {});
  }, [fields]);

  const validationSchema = Yup.object().shape({
    physicalLocation: Yup.string().required("Physical Location is required"),
    mainSystem: Yup.string().required("Main System is required"),
    rfidBarCode: Yup.string().required("RFID/Barcode is required"),
    accountingDept: Yup.string().required("Accounting Dept. is required"),
    parentAsset: Yup.string().required("Parent Asset is required"),
    childAsset: Yup.string().required("Child Asset is required"),
    assetNumber: Yup.string().required("Asset # is required"),
    serialNumber: Yup.string().required("Serial # is required"),
    make: Yup.string().required("Make is required"),
    model: Yup.string().required("Model is required"),
    part: Yup.string().required("Part # is required"),
    description: Yup.string()
      .max(150, "Max 150 characters allowed")
      .required("Description is required"),
    specDetails: Yup.string()
      .max(500, "Max 500 characters allowed")
      .required("Spec Details are required"),
    installedDate: Yup.date()
      .typeError("Installed Date must be a valid date")
      .required("Installed Date is required"),
    supplier: Yup.string().required("Suppliers are required"),
    criticality: Yup.string().required("Criticality is required"),
    originalMfrDate: Yup.date()
      .typeError("Original Mfr. Date must be a valid date")
      .required("Original Mfr. Date is required"),
    condition: Yup.string().required("Condition is required"),
    maintStatus: Yup.string().required("Maint. Status is required"),
    maintStartDate: Yup.date()
      .typeError("Maint. Start Date must be a valid date")
      .required("Maint. Start Date is required"),
    ...customFieldValidations,
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const customFields = fields.map((field) => ({
      uniqueKey: field.uniqueKey,
      value: values[field.uniqueKey],
    }));

    const standardValues = { ...values };
    fields.forEach((field) => {
      delete standardValues[field.uniqueKey];
    });

    const payload = {
      ...standardValues,
      customFields,
    };

    const { status, data } = await updateAsset({ ...payload, asset: slug });
    if (status === 200) {
      message.success(data?.message || "Asset Updated successfully");
      setDetails((prev) => ({ ...prev, dashboard: data.data }));
    } else {
      message.error(data.error);
    }

    resetForm();
    setSubmitting(false);
  };

  if ((slug && loading) || (slug && !details))
    return <div className="ml-10 mt-20 text-center">Loading...</div>;

  return (
    <div className="ml-5 md:ml-10">
      <p className="text-sm text-[#828282]">
        Asset {" > "} {slug ? slug + " > Edit" : "Add New Asset"}
      </p>
      <Button
        text="Back to Assets"
        onClick={() => router.push("/admin/assets")}
        className="mt-4 !bg-[#3F3F3F] !border-none"
        fullWidth={false}
        prefix={<LeftOutlined />}
      />
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
        <p className="text-2xl font-semibold mb-5">
          {slug ? "Edit " : "Add New "} Asset
        </p>
        <Formik
          initialValues={{
            physicalLocation: details?.dashboard?.physicalLocation || "",
            mainSystem: details?.dashboard?.mainSystem || "",
            rfidBarCode: details?.dashboard?.rfidBarCode || "",
            accountingDept: details?.dashboard?.accountingDept || "",
            parentAsset: details?.dashboard?.parentAsset || "",
            childAsset: details?.dashboard?.childAsset || "",
            assetNumber: details?.dashboard?.assetNumber || "",
            serialNumber: details?.dashboard?.serialNumber || "",
            make: details?.dashboard?.make || "",
            model: details?.dashboard?.model || "",
            part: details?.dashboard?.part || "",
            description: details?.dashboard?.description || "",
            specDetails: details?.dashboard?.specDetails || "",
            installedDate: details?.dashboard?.installedDate || "",
            supplier: details?.dashboard?.supplier || "",
            criticality: details?.dashboard?.criticality || "",
            originalMfrDate: details?.dashboard?.originalMfrDate || "",
            condition: details?.dashboard?.condition || "",
            maintStatus: details?.dashboard?.maintStatus || "",
            maintStartDate: details?.dashboard?.maintStartDate || "",
            ...customFieldInitialValues,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Asset Location
                </p>
                <div className="flex items-center gap-3">
                  <SelectField
                    name="site"
                    placeholder="Site"
                    className="!w-full"
                    label="Site"
                    options={rigs.map((i) => ({ label: i.name, value: i.id }))}
                  />
                  <Button
                    text="New"
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
                    // onClick={() => setAddSitePopupVisible(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <SelectField
                    name="location"
                    placeholder="Location"
                    label="Location"
                    options={
                      details?.dashboard?.physicalLocation
                        ? rigs
                            .find(
                              (i) => i.id === details.dashboard.physicalLocation
                            )
                            ?.systems.map((i) => ({
                              label: i.name,
                              value: i.id,
                            }))
                        : []
                    }
                  />
                  <Button
                    text="New"
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
                    // onClick={() => setAddSitePopupVisible(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <SelectField
                  name="category"
                  placeholder="Category"
                  label="Category"
                  options={[
                    { value: "1", label: "Category 1" },
                    { value: "2", label: "Category 2" },
                    { value: "3", label: "Category 3" },
                  ]}
                />
                <SelectField
                  name="subCategory"
                  placeholder="Sub Category"
                  label="Sub Category"
                  options={[
                    { value: "1", label: "Sub Category 1" },
                    { value: "2", label: "Sub Category 2" },
                    { value: "3", label: "Sub Category 3" },
                  ]}
                />
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Asset Details
                </p>
                <InputField
                  name="assetId"
                  placeholder="Asset ID"
                  label="Asset ID"
                />
                <DatePickerField name="purchaseDate" label="Purchase Date" />
                <div className="md:col-span-2">
                  <TextAreaField
                    name="details"
                    placeholder="Description"
                    label="Description"
                    className="!h-12"
                  />
                </div>
                <InputField name="brand" placeholder="Brand" label="Brand" />
                <InputField name="model" placeholder="Model" label="Model" />
                <InputField
                  name="serialNumber"
                  placeholder="Serial #"
                  label="Serial #"
                />
                <div className="md:col-span-2 font-semibold md:text-lg">
                  Asset Maintenance
                </div>
                <Table
                  loading={isLoading}
                  size={"large"}
                  scroll={{ x: 1400 }}
                  columns={columns}
                  rowSelection={rowSelection}
                  rowKey="_id"
                  dataSource={
                    assets &&
                    assets.length > 0 &&
                    assets.map((i, index) => ({
                      ...i,
                      key: index,
                    }))
                  }
                  style={{
                    marginTop: 16,
                    overflow: "auto",
                  }}
                  className="md:col-span-2"
                />
                <SelectField
                  name="category"
                  placeholder="Category"
                  label="Category"
                  options={[
                    { value: "1", label: "Category 1" },
                    { value: "2", label: "Category 2" },
                    { value: "3", label: "Category 3" },
                  ]}
                />
                <DatePickerField name="maintStartDate" label="Start Date" />
                <div className="md:col-span-2 sm:flex items-center">
                  <label className="text-sm text-[#30343F] sm:text-right sm:min-w-[115px]">
                    Criticality
                  </label>
                  <Radio.Group name="criticality" className="">
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
                </div>
                <div className="md:col-span-2 sm:flex items-center">
                  <label className="text-sm text-[#30343F] sm:text-right sm:min-w-[115px]">
                    Maint. Status
                  </label>
                  <Radio.Group name="maintStatus" className="">
                    <Radio value="Active" className="!ml-3">
                      Active
                    </Radio>
                    <Radio value="damagedBeyondRepair" className="sm:!ml-7">
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
                  </Radio.Group>
                </div>

                {fields.length > 0 && (
                  <p className="md:col-span-2 font-semibold md:text-lg">
                    Custom Fields:
                  </p>
                )}
                {fields.map((field) => {
                  switch (field.type) {
                    case "text":
                      return (
                        <InputField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={field.name}
                          label={field.name}
                        />
                      );
                    case "number":
                      return (
                        <InputField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={field.name}
                          label={field.name}
                          type="number"
                        />
                      );
                    case "dropdown":
                      return (
                        <SelectField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={"Select " + field.name}
                          label={field.name}
                          options={field.options.map((option) => ({
                            label: option,
                            value: option,
                          }))}
                        />
                      );
                    case "date":
                      return (
                        <DatePickerField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          label={field.name}
                        />
                      );
                    default:
                      return null;
                  }
                })}
                <div className="md:col-span-2 sm:ml-32">
                  <Button
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-2"
                    // onClick={() => setAddFieldPopupVisible(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                    text="Add More"
                  />
                </div>
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Asset Image
                </p>
                <div className={`w-full flex items-center gap-3`}>
                  <label className="text-sm text-[#30343F] text-right min-w-[115px]">
                    Upload
                  </label>

                  <Button
                    className="!bg-green-600 !shadow-custom !border-white !h-11 mt-2"
                    // onClick={() => setAddDocPopupVisible(true)}
                    fullWidth={false}
                    prefix={<UploadOutlined />}
                    text="Choose Image"
                  />
                </div>
              </div>
              <div className="text-right mt-5">
                <Button
                  className="mr-2"
                  onClick={() => router.push("/admin/assets")}
                  outlined
                  size="small"
                  text="Cancel"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
                <Button
                  className="mr-2 !text-base"
                  htmlType="submit"
                  isLoading={isSubmitting}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="small"
                  text={slug ? "Update" : "Add New Asset"}
                  fullWidth={false}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AssetForm;
