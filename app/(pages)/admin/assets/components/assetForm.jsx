import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Radio, Table, Upload } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { addAsset, getAssetDetails, updateAsset } from "app/services/assets";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import TextAreaField from "@/components/common/TextAreaField";
import { rigs } from "@/constants/rigsAndSystems";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getFields } from "app/services/customFields";
import { LeftOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import AddFieldPopup from "@/components/addFieldPopup";
import AddSitePopup from "../../settings/sites/components/addSitePopup";
import AddSystemPopup from "../../settings/locations/components/addSystemPopup";
import AddCategoryPopup from "../../settings/categories/components/addCategoryPopup";
import AddSubCategoryPopup from "../../settings/sub-categories/components/addSubCategoryPopup";
import { getCategories } from "app/services/setUp/categories";
import { getSubCategories } from "app/services/setUp/subCategories";
import { editAsset, updateAssets } from "app/redux/slices/assetsSlice";
import dayjs from "dayjs";

const columns = [
  {
    title: "Asset #",
    dataIndex: "assetID",
    key: "assetNumber",
    render: (assetID) => <a className="text-[#017BFE] underline">{assetID}</a>,
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
  const [addFieldPopupVisible, setAddFieldPopupVisible] = useState(false);
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);
  const [addSitePopup, setAddSitePopup] = useState(false);
  const [addSystemPopup, setAddSystemPopup] = useState(false);
  const [addCategoryPopup, setAddCategoryPopup] = useState(false);
  const [addSubCategoryPopup, setAddSubCategoryPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

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
    category: Yup.string().required("Category is required"),
    subCategory: Yup.string().required("Sub-category is required"),
    assetID: Yup.string().required("Asset number is required"),
    purchaseDate: Yup.date().required("Purchase date is required"),
    description: Yup.string().required("Description is required"),
    brand: Yup.string().required("Brand is required"),
    model: Yup.string().required("Model is required"),
    serialNumber: Yup.string().required("Serial number is required"),
    maintCategory: Yup.string().required("Maintenance category is required"),
    startDate: Yup.date().required("Start date is required"),
    criticality: Yup.string().required("Criticality is required"),
    maintStatus: Yup.string().required("Maintenance status is required"),
    assetImages: Yup.array().required("Asset Image is required"),
    ...customFieldValidations,
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      // Extract custom field values
      const customFields = fields.map((field) => ({
        uniqueKey: field.uniqueKey,
        value: values[field.uniqueKey],
      }));

      // Remove custom fields from values to get standard fields
      const standardValues = { ...values };
      fields.forEach((field) => delete standardValues[field.uniqueKey]);

      // Append standard form values
      Object.entries(standardValues).forEach(([key, value]) => {
        if (value && key !== "customFields" && key !== "assetImages") {
          formData.append(key, value);
        }
      });

      // Append the image if it exists and is a File object
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
            console.log("prevImage", {
              url: image.uniqueName,
              name: image.name,
              _id: image._id,
            });
          }
        });

      // Append custom fields in the correct format
      if (customFields.length > 0) {
        formData.append("customFields", JSON.stringify(customFields));
      }

      // Append the image if it exists and is a File object
      // if (values.assetImage instanceof File) {
      //   formData.append("assetImage", values.assetImage);
      // }

      // formData.append("childAssets", selectedRowKeys);

      let response;
      if (slug) {
        // Update asset
        formData.append("asset", slug);
        response = await updateAsset(formData);
      } else {
        // Add new asset
        response = await addAsset(formData);
      }

      const { status, data } = response;

      if (status === 200) {
        message.success(
          data?.message ||
            (slug ? "Asset Updated successfully" : "Asset Added successfully")
        );

        // Update Redux store accordingly
        if (slug) {
          dispatch(editAsset(data.data));
          setDetails((prev) => ({ ...prev, dashboard: data.data }));
        } else {
          dispatch(updateAssets(data.data));
        }
        resetForm();
      } else {
        message.error(data.error || "Failed to process request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Something went wrong!");
    }

    setSubmitting(false);
  };

  if ((slug && loading) || (slug && !details))
    return <div className="ml-10 mt-20 text-center">Loading...</div>;

  return (
    <div className="mx-5 md:mx-10">
      <AddFieldPopup
        visible={addFieldPopupVisible}
        setVisible={setAddFieldPopupVisible}
        module="assets"
        fields={fields}
        setFields={setFields}
      />
      <AddSitePopup visible={addSitePopup} setVisible={setAddSitePopup} />
      <AddSystemPopup
        visible={addSystemPopup}
        setVisible={setAddSystemPopup}
      />
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
            site: details?.dashboard?.site?._id || "",
            system: details?.dashboard?.system?._id || "",
            category: details?.dashboard?.category?._id || "",
            subCategory: details?.dashboard?.subCategory?._id || "",
            assetID: details?.dashboard?.assetID || "",
            purchaseDate: details?.dashboard?.purchaseDate || "",
            description: details?.dashboard?.description || "",
            brand: details?.dashboard?.brand || "",
            model: details?.dashboard?.model || "",
            serialNumber: details?.dashboard?.serialNumber || "",
            maintCategory: details?.dashboard?.maintCategory?._id || "",
            startDate: details?.dashboard?.startDate || "",
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
          {({ values, isSubmitting, handleSubmit, setFieldValue, errors }) => (
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
                  />
                  <Button
                    text="New"
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
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
                    options={
                      values.site &&
                      systems
                        .filter((i) => i?.site?._id === values.site)
                        ?.map((i) => ({
                          label: i.system,
                          value: i._id,
                        }))
                    }
                  />
                  <Button
                    text="New"
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
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
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
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
                    className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
                    onClick={() => setAddSubCategoryPopup(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                  />
                </div>
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Asset Details
                </p>
                <InputField
                  name="assetID"
                  placeholder="Asset ID"
                  label="Asset ID"
                />
                <DatePickerField name="purchaseDate" label="Purchase Date" />
                <div className="md:col-span-2">
                  <TextAreaField
                    name="description"
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
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Asset Maintenance
                </p>
                {/* <Table
                  loading={isLoading}
                  size={"large"}
                  scroll={{ x: 700 }}
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
                  pagination={false}
                /> */}
                <SelectField
                  name="maintCategory"
                  placeholder="Category"
                  label="Category"
                  options={categories.map((i) => ({
                    label: i.category,
                    value: i._id,
                  }))}
                />
                <DatePickerField name="startDate" label="Start Date" />
                {console.log("values:", values)}
                <div className="md:col-span-2 sm:flex items-center">
                  <label className="text-sm sm:text-right sm:min-w-[115px]">
                    Criticality
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
                <div className="md:col-span-2 sm:ml-32">
                  <Button
                    className="!bg-[#4C4C51] !shadow-custom !border-white mt-2"
                    onClick={() => setAddFieldPopupVisible(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                    text="Add More"
                  />
                </div>
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Asset Image
                </p>
                <div className={`w-full flex gap-3`}>
                  <label className="text-sm text-right min-w-[115px] mt-3">
                    Upload
                  </label>
                  <Upload
                    beforeUpload={() => {
                      // Prevent auto-upload, just return false
                      return false;
                    }}
                    onChange={(info) => {
                      const updatedFileList = info.fileList;

                      // When file is removed, update Formik field value by filtering out the removed file
                      if (info.file.status === "removed") {
                        setFieldValue(
                          "assetImages",
                          values.assetImages.filter(
                            (f) => f.uid !== info.file.uid
                          )
                        );
                      } else {
                        // Update Formik's field with the updated file list
                        setFieldValue("assetImages", updatedFileList);
                      }
                    }}
                    fileList={values.assetImages || []} // Default to empty array if assetImage is not yet set
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
              </div>
              {values.assetImage && typeof values.assetImage === "string" && (
                <span className="">{values.assetImage.split("/").pop()}</span>
              )}
              <ErrorMessage
                name="assetImage"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <div className="text-right mt-5 mb-5">
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
                  text={slug ? "Update Asset" : "Add New Asset"}
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
