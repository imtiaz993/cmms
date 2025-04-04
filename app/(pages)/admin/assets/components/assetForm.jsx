import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Modal, Radio, Spin, Table, Upload } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { addAsset, getAssetDetails, updateAsset } from "app/services/assets";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import TextAreaField from "@/components/common/TextAreaField";
import { rigs } from "@/constants/rigsAndSystems";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getFields } from "app/services/customFields";
import {
  DeleteOutlined,
  LeftOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import AddFieldPopup from "@/components/addFieldPopup";
import AddSitePopup from "../../settings/sites/components/addSitePopup";
import AddSystemPopup from "../../settings/locations/components/addSystemPopup";
import AddCategoryPopup from "../../settings/categories/components/addCategoryPopup";
import AddSubCategoryPopup from "../../settings/sub-categories/components/addSubCategoryPopup";
import { getCategories } from "app/services/setUp/categories";
import { getSubCategories } from "app/services/setUp/subCategories";
import { editAsset, updateAssets } from "app/redux/slices/assetsSlice";
import ImagePreview from "@/components/imagePreviewPopup";
import { assignToAsset, getInventoryDetails } from "app/services/inventory";

const AssetForm = () => {
  const { slug } = useParams();
  const [details, setDetails] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { assets, isLoading, error } = useSelector((state) => state.assets);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addFieldPopupVisible, setAddFieldPopupVisible] = useState(false);
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);
  const [addSitePopup, setAddSitePopup] = useState(false);
  const [addSystemPopup, setAddSystemPopup] = useState(false);
  const [addCategoryPopup, setAddCategoryPopup] = useState(false);
  const [addSubCategoryPopup, setAddSubCategoryPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const [assetsSaved, setAssetsSaved] = useState([]);

  const searchParams = useSearchParams();
  const inventory = searchParams.get("inventory");
  const activeLocation = searchParams.get("location") || "";
  const params =
    activeLocation && activeLocation !== null && "?location=" + activeLocation;

  const columns = [
    // {
    //   title: "Asset #",
    //   dataIndex: "assetID",
    //   key: "assetNumber",
    //   render: (assetID) => (
    //     <a className="text-[#017BFE] underline">{assetID}</a>
    //   ),
    // },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) =>
        categories.find((c) => c._id === category)?.category,
    },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "Criticality", dataIndex: "criticality", key: "criticality" },
    { title: "Status", dataIndex: "maintStatus", key: "maintStatus" },
    {
      title: "",
      dataIndex: "",
      key: "delete",
      render: (_, record, index) => (
        <DeleteOutlined
          onClick={() =>
            setAssetsSaved((prev) => prev.filter((item, i) => i !== index))
          }
        />
      ),
    },
  ];

  useEffect(() => {
    const getInventory = async () => {
      const { status, data } = await getInventoryDetails(inventory);
      if (status === 200) {
        console.log(data);
        setDetails({
          ...data?.data,
          dashboard: {
            ...data?.data?.dashboard,
            assetImages: data?.data?.dashboard?.image,
          },
        });
      } else {
        message.error(data?.message || "Failed to fetch data");
      }
    };

    if (inventory) {
      getInventory();
    }
  }, [inventory]);

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

    slug && getAsset();
  }, [slug]);

  useEffect(() => {
    const handleFetchFields = async () => {
      const { status, data } = await getFields("assets");
      if (status === 200) {
        setFields(data.data);
      } else {
        message.error(data.error);
      }
      setLoading(false);
    };

    handleFetchFields();
  }, []);

  useEffect(() => {
    const handleFetchSubCategories = async () => {
      const { status, data } = await getSubCategories();
      if (status === 200) {
        setSubCategories(data.data);
      } else {
        message.error(data.error);
      }
    };
    const handleFetchCategories = async () => {
      const { status, data } = await getCategories();
      if (status === 200) {
        setCategories(data.data);
      } else {
        message.error(data.error);
      }
    };
    handleFetchCategories();
    handleFetchSubCategories();
  }, []);

  const customFieldInitialValues = useMemo(() => {
    // Parse the customFields from the details object
    const parsedCustomFields = details?.dashboard?.customFields || [];
    // ? JSON.parse(details.dashboard.customFields)
    // : [];

    return fields.reduce((acc, field) => {
      // Find the custom field value for this field from the parsed customFields
      const customField = parsedCustomFields.find(
        (customField) => customField.uniqueKey === field.uniqueKey
      );

      // Set the value if found, otherwise default to an empty string
      acc[field.uniqueKey] = customField ? customField.value : "";
      return acc;
    }, {});
  }, [fields, details]);

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
    site: Yup.string().required("Site is required"),
    system: Yup.string().required("System is required"),
    category: Yup.string(),
    subCategory: Yup.string(),
    purchaseDate: Yup.date(),
    description: Yup.string().required("Description is required"),
    brand: Yup.string(),
    model: Yup.string(),
    serialNumber: Yup.string(),
    cost: Yup.number(),
    maintCategory: Yup.string(),
    startDate: Yup.date()
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        "Start date cannot be before today"
      )
      .test(
        "min-7-days",
        "Start date needs to be at least 7 days from today",
        function (value) {
          if (!value) return false; // If value is null/undefined, fail (required will handle this)
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Normalize to start of day
          const minDate = new Date(today);
          minDate.setDate(today.getDate() + 7); // Today + 7 days
          return value >= minDate;
        }
      )
      .required("Start date is required"),
    dueDate: Yup.date().min(
      Yup.ref("startDate"),
      "Due date cannot be before start date"
    ),
    criticality: Yup.string().required("Criticality is required"),
    maintStatus: Yup.string(),
    assetImages: Yup.array(),
    // ...customFieldValidations,
  });

  const handleAddMore = async (values, { resetForm, validateForm }) => {
    // Validate the form before adding to workOrdersSaved
    const errors = await validateForm(values);
    if (Object.keys(errors).length > 0) {
      message.error("Please fill all required fields correctly.");
      for (const [key, value] of Object.entries(errors)) {
        message.error(value);
      }
      return;
    }

    // Add the current form values to workOrdersSaved
    setAssetsSaved((prev) => [...prev, values]);
    console.log("Added to saved assets:", values);
    console.log("Current saved assets:", [...assetsSaved, values]);

    // Reset the form to allow adding another asset
    resetForm();
    message.success("Asset added to queue. Add more or submit to save.");
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // If slug or inventory exists, handle as before (update or assign)
      if (slug || inventory) {
        const formData = new FormData();

        const customFields = fields.map((field) => ({
          uniqueKey: field.uniqueKey,
          value: values[field.uniqueKey],
        }));

        const standardValues = { ...values };
        fields.forEach((field) => delete standardValues[field.uniqueKey]);

        Object.entries(standardValues).forEach(([key, value]) => {
          if (value && key !== "customFields" && key !== "assetImages") {
            formData.append(key, value);
          }
        });

        values.assetImages.length > 0 &&
          values.assetImages.forEach((image) => {
            if (image.originFileObj instanceof File)
              formData.append("assetImages", image.originFileObj);
            else {
              formData.append(
                "prevImage",
                JSON.stringify({
                  url: image.uniqueName,
                  name: image.name,
                  _id: image._id,
                })
              );
            }
          });

        if (customFields.length > 0) {
          formData.append("customFields", JSON.stringify(customFields));
        }

        let response;
        if (slug) {
          formData.append("asset", slug);
          response = await updateAsset(formData);
        } else if (inventory) {
          formData.append("inventory", inventory);
          response = await assignToAsset(formData);
        }

        const { status, data } = response;

        if (status === 200) {
          if (slug) {
            dispatch(editAsset(data.data));
            setDetails((prev) => ({ ...prev, dashboard: data.data }));
            message.success("Asset updated successfully");
          } else {
            message.success("Asset added successfully");
            dispatch(updateAssets(data.data));
          }
          router.push("/admin/assets" + params);
          resetForm();
        } else {
          message.error(data.error || "Failed to process request");
        }
      } else {
        // For adding new assets: combine current form values with workOrdersSaved
        const allAssets = [...assetsSaved, values];
        console.log("Submitting all assets:", allAssets);

        // Process each asset one by one
        for (const assetValues of allAssets) {
          const formData = new FormData();

          const customFields = fields.map((field) => ({
            uniqueKey: field.uniqueKey,
            value: assetValues[field.uniqueKey],
          }));

          const standardValues = { ...assetValues };
          fields.forEach((field) => delete standardValues[field.uniqueKey]);

          Object.entries(standardValues).forEach(([key, value]) => {
            if (value && key !== "customFields" && key !== "assetImages") {
              formData.append(key, value);
            }
          });

          assetValues.assetImages.length > 0 &&
            assetValues.assetImages.forEach((image) => {
              if (image.originFileObj instanceof File)
                formData.append("assetImages", image.originFileObj);
              else {
                formData.append(
                  "prevImage",
                  JSON.stringify({
                    url: image.uniqueName,
                    name: image.name,
                    _id: image._id,
                  })
                );
              }
            });

          if (customFields.length > 0) {
            formData.append("customFields", JSON.stringify(customFields));
          }

          const response = await addAsset(formData);
          const { status, data } = response;

          if (status === 200) {
            dispatch(updateAssets(data.data));
            setAssetsSaved((prev) =>
              prev.filter((asset) => asset !== assetValues)
            );
          } else {
            message.error(data.error || "Failed to process request");
            setSubmitting(false);
            return; // Stop processing if one asset fails
          }
        }

        message.success("All assets added successfully");
        setAssetsSaved([]); // Clear the saved assets
        router.push("/admin/assets" + params);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Something went wrong!");
    }

    setSubmitting(false);
  };

  const maintenanceCategories = [
    "Preventive Maintenance",
    "Predictive Maintenance",
    "Corrective Maintenance",
    "Emergency Maintenance",
    "Shutdown & Turnaround",
    "Safety & Compliance",
    "Equipment Upgrade",
    "Facility Maintenance",
    "Rotating Equipment Maintenance",
    "Static Equipment Maintenance",
    "Electrical System Maintenance",
    "Instrumentation & Control Maintenance",
    "Piping & Pipeline Maintenance",
    "Corrosion Control",
    "HVAC & Utility Systems",
    "Regulatory Inspections",
    "Leak Detection & Repair",
    "Process Optimization",
    "Calibration Work Orders",
    "Lubrication Management",
    "Structural Integrity Checks",
    "Material Transfer & Handling",
    "Spare Parts Replacement",
    "Energy Efficiency Improvements",
    "Fire & Gas System Maintenance",
    "Environmental Compliance",
    "Boiler & Steam System Maintenance",
    "Cooling Tower Maintenance",
    "Tank Farm Maintenance",
    "SCADA & Automation Maintenance",
  ];

  if ((slug && loading) || (slug && !details) || (inventory && !details))
    return (
      <Spin
        size="large"
        spinning={true}
        className="text-center w-full !mt-80"
      />
    );

  return (
    <div className="mx-5 md:mx-10">
      <ImagePreview
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
      <AddFieldPopup
        visible={addFieldPopupVisible}
        setVisible={setAddFieldPopupVisible}
        module="assets"
        fields={fields}
        setFields={setFields}
      />
      <AddSitePopup visible={addSitePopup} setVisible={setAddSitePopup} />
      <AddSystemPopup visible={addSystemPopup} setVisible={setAddSystemPopup} />
      <AddCategoryPopup
        visible={addCategoryPopup}
        setVisible={setAddCategoryPopup}
        setCategories={setCategories}
      />
      <AddSubCategoryPopup
        visible={addSubCategoryPopup}
        setVisible={setAddSubCategoryPopup}
        setSubCategories={setSubCategories}
        categories={categories}
      />
      <p className="text-sm text-[#828282]">
        Asset {" > "}{" "}
        {slug
          ? slug + " > Edit"
          : inventory
          ? "Assign to Asset > " + inventory
          : "Add New Asset"}
      </p>
      <Button
        text="Back to Assets"
        onClick={() => router.push("/admin/assets" + params)}
        className="mt-4 !bg-[#3F3F3F] !border-none"
        fullWidth={false}
        prefix={<LeftOutlined />}
      />
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
        <p className="text-2xl font-semibold mb-5">
          {slug ? "Edit " : inventory ? "Assign to " : "Add New "} Asset
        </p>
        <Formik
          initialValues={{
            site: details?.dashboard?.site?._id || "",
            system: details?.dashboard?.system?._id || "",
            category: details?.dashboard?.category?._id || "",
            subCategory: details?.dashboard?.subCategory?._id || "",
            purchaseDate: details?.dashboard?.purchaseDate || "",
            description: details?.dashboard?.description || "",
            brand: details?.dashboard?.brand || "",
            model: details?.dashboard?.model || "",
            serialNumber: details?.dashboard?.serialNumber || "",
            cost: details?.dashboard?.cost || "",
            maintCategory: details?.dashboard?.maintCategory || "",
            startDate: details?.dashboard?.startDate || "",
            dueDate: details?.dashboard?.dueDate || "",
            criticality: details?.dashboard?.criticality || "",
            maintStatus: details?.dashboard?.maintStatus || "",
            assetImages: details?.dashboard?.assetImages
              ? details.dashboard.assetImages.map((i) => {
                  return {
                    name: i.name,
                    uniqueName: i.url,
                    url: process.env.NEXT_PUBLIC_S3_BASE_URL + i.url,
                    _id: i._id,
                  };
                })
              : [],
            // ? [
            //     {
            //       name: details?.dashboard?.assetImage,
            //     },
            //   ]
            // : [],
            // childAssets: details?.dashboard?.childAssets || [],
            ...customFieldInitialValues,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            isSubmitting,
            handleSubmit,
            setFieldValue,
            resetForm,
            validateForm,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              {console.log("values", values)}
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
                    options={locations.map((i) => ({
                      label: i.site,
                      value: i._id,
                    }))}
                    required
                  />
                  <Button
                    text="New"
                    className="!bg-transparent dark:!bg-[#4C4C51] !shadow-[0px_0px_20px_0px_#EFBF6080] dark:!border-white !text-tertiary !dark:text-white !h-11 mt-5 sm:mt-0"
                    onClick={() => setAddSitePopup(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <SelectField
                    name="system"
                    placeholder="System"
                    label="System"
                    options={systems?.map((i) => ({
                      label: i.system,
                      value: i._id,
                    }))}
                    required
                  />
                  <Button
                    text="New"
                    className="!bg-transparent dark:!bg-[#4C4C51] !shadow-[0px_0px_20px_0px_#EFBF6080] dark:!border-white !text-tertiary !dark:text-white !h-11 mt-5 sm:mt-0"
                    onClick={() => setAddSystemPopup(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <SelectField
                    name="category"
                    placeholder="Category"
                    label="Category"
                    options={categories.map((i) => ({
                      label: i.category,
                      value: i._id,
                    }))}
                  />
                  <Button
                    text="New"
                    className="!bg-transparent dark:!bg-[#4C4C51] !shadow-[0px_0px_20px_0px_#EFBF6080] dark:!border-white !text-tertiary !dark:text-white !h-11 mt-5 sm:mt-0"
                    onClick={() => setAddCategoryPopup(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <SelectField
                    name="subCategory"
                    placeholder="Sub Category"
                    label="Sub Category"
                    options={
                      values.category &&
                      subCategories
                        .filter((i) => i?.category?._id === values.category)
                        ?.map((i) => ({
                          label: i.subCategory,
                          value: i._id,
                        }))
                    }
                  />
                  <Button
                    text="New"
                    className="!bg-transparent dark:!bg-[#4C4C51] !shadow-[0px_0px_20px_0px_#EFBF6080] dark:!border-white !text-tertiary !dark:text-white !h-11 mt-5 sm:mt-0"
                    onClick={() => setAddSubCategoryPopup(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Asset Details
                </p>

                <DatePickerField name="purchaseDate" label="Purchase Date" />
                <div className="md:col-span-2">
                  <TextAreaField
                    name="description"
                    placeholder="Description"
                    label="Description"
                    className="!h-12"
                    required
                  />
                </div>
                <InputField name="brand" placeholder="Brand" label="Brand" />
                <InputField name="model" placeholder="Model" label="Model" />
                <InputField
                  name="serialNumber"
                  placeholder="Serial #"
                  label="Serial #"
                />
                <InputField
                  name="cost"
                  type="number"
                  placeholder="0.00"
                  label="Cost"
                />
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Asset Maintenance
                </p>
                <SelectField
                  name="maintCategory"
                  placeholder="Category"
                  label="Category"
                  options={maintenanceCategories.map((i) => ({
                    label: i,
                    value: i,
                  }))}
                />
                <DatePickerField name="startDate" label="Start Date" required />
                <DatePickerField name="dueDate" label="Completion" required />
                <div className="md:col-span-2">
                  <div className="sm:flex items-center">
                    <label className="text-sm sm:text-right sm:min-w-[115px]">
                      Criticality{" "}
                      <span className="text-red-600 text-xl">*</span>
                    </label>
                    <Field name="criticality">
                      {({ field, form }) => (
                        <Radio.Group {...field} className="">
                          <Radio value="critical" className="!ml-3">
                            Critical
                          </Radio>
                          <Radio value="high" className="sm:!ml-7">
                            High
                          </Radio>
                          <Radio value="medium" className="sm:!ml-7">
                            Medium
                          </Radio>
                          <Radio value="low" className="sm:!ml-7">
                            Low
                          </Radio>
                        </Radio.Group>
                      )}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="criticality"
                    component="div"
                    className="text-red-500 text-sm mt-1 sm:ml-32"
                  />
                </div>
                <div className="md:col-span-2 sm:flex items-center">
                  <label className="text-sm sm:text-right sm:min-w-[115px]">
                    Maint. Status
                  </label>
                  <Field name="maintStatus">
                    {({ field, form }) => (
                      <Radio.Group {...field} className="">
                        <Radio value="active" className="!ml-3">
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

                <p className="md:col-span-2 font-semibold md:text-lg">
                  Asset Image
                </p>
                <div className={`w-full flex gap-3`}>
                  <label className="text-sm text-right min-w-[115px] mt-3">
                    Upload
                  </label>
                  <Upload
                    listType="picture"
                    beforeUpload={(file) => {
                      file.preview = URL.createObjectURL(file);
                      file.url = URL.createObjectURL(file);
                      return false;
                    }}
                    onChange={(info) => {
                      const updatedFileList = info.fileList;
                      setFieldValue("assetImages", updatedFileList);
                    }}
                    onRemove={(file) => {
                      setFieldValue(
                        "assetImages",
                        values.assetImages.filter((f) => f.uid !== file.uid)
                      );
                    }}
                    onPreview={(file) => {
                      setPreviewImage(file.preview || file.url);
                    }}
                    fileList={values.assetImages || []}
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
                <ErrorMessage
                  name="assetImages"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <Table
                  loading={isLoading}
                  size={"large"}
                  scroll={{ x: 700 }}
                  columns={columns}
                  rowSelection={rowSelection}
                  rowKey="_id"
                  dataSource={
                    assetsSaved &&
                    assetsSaved.length > 0 &&
                    assetsSaved.map((i, index) => ({
                      ...i,
                      key: index,
                    }))
                  }
                  style={{
                    marginTop: 16,
                    overflow: "auto",
                  }}
                  className="md:col-span-2"
                  pagination={false}
                />
                <div className="md:col-span-2 sm:ml-32">
                  <Button
                    className="!bg-transparent dark:!bg-[#4C4C51] !shadow-[0px_0px_20px_0px_#EFBF6080] dark:!border-white !text-tertiary !dark:text-white !h-11 mt-5 sm:mt-0"
                    onClick={() =>
                      handleAddMore(values, { resetForm, validateForm })
                    }
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                    text="Add More"
                  />
                </div>
              </div>
              <div className="text-right mt-5 mb-5">
                <Button
                  className="mr-2"
                  onClick={() => router.push("/admin/assets" + params)}
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
                  text={
                    slug
                      ? "Update Asset"
                      : inventory
                      ? "Assign to Asset"
                      : "Add New Asset"
                  }
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
