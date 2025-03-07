"use client";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Spin, Table, Upload } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import {
  addInventory,
  getInventoryDetails,
  updateInventoryApi,
} from "app/services/inventory";
import DatePickerField from "@/components/common/DatePickerField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { useEffect, useMemo, useState } from "react";
import { getFields } from "app/services/customFields";
import AddFieldPopup from "@/components/addFieldPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  editInventory,
  updateInventory,
} from "app/redux/slices/inventoriesSlice";
import { useParams, useRouter } from "next/navigation";
import { LeftOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import AddSitePopup from "../../settings/sites/components/addSitePopup";
import AddSystemPopup from "../../settings/locations/components/addSystemPopup";
import ImagePreview from "@/components/imagePreviewPopup";

const columns = [
  {
    title: "Part #",
    dataIndex: "partItem",
    key: "partItem",
  },
  {
    title: "Description",
    dataIndex: "details",
    key: "details",
  },
  {
    title: "Received Date",
    dataIndex: "receivedDate",
    key: "receivedDate",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "tag ID",
    dataIndex: "tagId",
    key: "tagId",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
];
const defaultCheckedList = columns.map((item) => item.key);

const InventoryForm = () => {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  const [addFieldPopupVisible, setAddFieldPopupVisible] = useState(false);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    inventory = [],
    isLoading,
    error,
  } = useSelector((state) => state.inventory); // Get inventory from store
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);
  const [addSitePopup, setAddSitePopup] = useState(false);
  const [addSystemPopup, setAddSystemPopup] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  useEffect(() => {
    const getInventory = async () => {
      const { status, data } = await getInventoryDetails(slug);
      if (status === 200) {
        console.log(data);
        setDetails(data?.data?.dashboard);
      } else {
        message.error(data?.message || "Failed to fetch data");
      }
    };
    slug && getInventory();
  }, [slug]);

  useEffect(() => {
    const handleFetchFields = async () => {
      const { status, data } = await getFields("inventory");
      if (status === 200) {
        setFields(data.data);
      } else {
        message.error(data.error);
      }
      setLoading(false);
    };
    handleFetchFields();
  }, []);

  const customFieldInitialValues = useMemo(() => {
    // Parse the customFields from the details object
    const parsedCustomFields = details?.customFields || [];
    // ? JSON.parse(details.customFields)
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

  const customFieldValidations = fields.reduce((acc, field) => {
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

  const validationSchema = Yup.object().shape({
    site: Yup.string().required("Site is required"),
    system: Yup.string().required("System is required"),
    invoiceNumber: Yup.string().required("Invoice Number is required"),
    receivedDate: Yup.date().required("Received Date is required"),
    partNumber: Yup.string().required("Part Number is required"),
    tagId: Yup.string().required("Tag ID is required"),
    description: Yup.string().required("Description is required"),
    quantity: Yup.number().required("Quantity is required"),
    notes: Yup.string().required("Notes is required"),
    image: Yup.array().min(1, "At least one image is required"),
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
        if (value && key !== "customFields" && key !== "image") {
          formData.append(key, value);
        }
      });

      // Append the image if it exists and is a File object
      values.image.length > 0 &&
        values.image.forEach((image) => {
          if (image.originFileObj instanceof File)
            formData.append("image", image.originFileObj);
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
      // // Append the image if it exists and is a File object
      // if (values.image instanceof File) {
      //   formData.append("image", values.image);
      // }

      // formData.append("childInventory", selectedRowKeys);

      let response;
      if (slug) {
        // Update inventory
        formData.append("inventory", slug);
        response = await updateInventoryApi(formData);
      } else {
        // Add new inventory
        response = await addInventory(formData);
      }

      const { status, data } = response;

      if (status === 200) {
        // Update Redux store accordingly
        if (slug) {
          // setDetails((prev) => ({ ...prev, dashboard: data.data }));
          dispatch(editInventory(data.data));
          message.success("Inventory Updated successfully");
        } else {
          message.success("Inventory Added successfully");
          dispatch(updateInventory(data.data));
        }
        router.push("/admin/inventory");
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
        module="inventory"
        fields={fields}
        setFields={setFields}
      />
      <AddSitePopup visible={addSitePopup} setVisible={setAddSitePopup} />
      <AddSystemPopup visible={addSystemPopup} setVisible={setAddSystemPopup} />
      <p className="text-sm text-[#828282]">
        Inventory {" > "} {slug ? slug + " > Edit" : "Add New Inventory"}
      </p>
      <div className="flex justify-between mt-4">
        <Button
          text="Back to Inventory"
          onClick={() => router.push("/admin/inventory")}
          className="!bg-[#3F3F3F] !border-none"
          fullWidth={false}
          prefix={<LeftOutlined />}
        />
      </div>
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
        <p className="text-2xl font-semibold mb-5">
          {slug ? "Edit Inventory" : "New Inventory Form"}
        </p>
        {console.log("details", details)}

        <Formik
          initialValues={{
            site: details?.site?._id || "",
            system: details?.system?._id || "",
            invoiceNumber: details?.invoiceNumber || "",
            receivedDate: details?.receivedDate || null,
            partNumber: details?.partNumber || "",
            tagId: details?.tagId || "",
            description: details?.description || "",
            quantity: details?.quantity || "",
            notes: details?.notes || "",
            image: details?.image
              ? details.image.map((i) => {
                  return {
                    name: i.name,
                    uniqueName: i.url,
                    url: process.env.NEXT_PUBLIC_S3_BASE_URL + i.url,
                    _id: i._id,
                  };
                })
              : [],
            ...customFieldInitialValues,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              {console.log("values", values)}
              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Inventory Information
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

                <InputField
                  name="invoiceNumber"
                  placeholder="Invoice/PO #"
                  label="Invoice/PO #"
                />
                <DatePickerField name="receivedDate" label="Date Received" />

                {/* <p className="md:col-span-2 font-semibold md:text-lg">
                  Inventory Added
                </p>

                <Table
                  loading={isLoading}
                  size={"large"}
                  scroll={{ x: 1000 }}
                  columns={columns}
                  rowSelection={rowSelection}
                  rowKey="_id"
                  dataSource={
                    inventory &&
                    inventory.length > 0 &&
                    inventory.map((i, index) => ({
                      ...i,
                      key: index,
                    }))
                  }
                  style={{
                    marginTop: 16,
                    overflow: "auto",
                  }}
                  className="md:col-span-2"
                /> */}

                <p className="md:col-span-2 font-semibold md:text-lg">
                  Inventory Information
                </p>
                <InputField
                  name="partNumber"
                  placeholder="Part #"
                  label="Part #"
                />
                <InputField name="tagId" placeholder="Tag ID" label="Tag ID" />
                <div className="md:col-span-2">
                  <TextAreaField
                    name="description"
                    placeholder="Description"
                    label="Description"
                    className="!h-12"
                  />
                </div>
                <InputField
                  name="quantity"
                  placeholder="00"
                  label="Quantity"
                  type="number"
                />
                <InputField name="notes" placeholder="Model" label="Notes" />

                <div className={`w-full flex items-center gap-3`}>
                  <label className="text-sm text-right min-w-[115px] mt-3">
                    Upload Image
                  </label>
                  <div>
                    <Upload
                      listType="picture"
                      beforeUpload={(file) => {
                        file.preview = URL.createObjectURL(file);
                        file.url = URL.createObjectURL(file);
                        return false;
                      }}
                      onChange={(info) => {
                        const updatedFileList = info.fileList;
                        setFieldValue("image", updatedFileList);
                      }}
                      onRemove={(file) => {
                        setFieldValue(
                          "image",
                          values.image.filter((f) => f.uid !== file.uid)
                        );
                      }}
                      onPreview={(file) => {
                        setPreviewImage(file.preview || file.url);
                      }}
                      fileList={values.image || []}
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

                    {values.image && typeof values.image === "string" && (
                      <span className="">{values.image.split("/").pop()}</span>
                    )}
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <p className="md:col-span-2 font-semibold md:text-lg">
                  Custom Fields:
                </p>
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
                          options={field.preFilValue.map((value) => ({
                            label: value,
                            value: value,
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
                    onClick={() => setAddFieldPopupVisible(true)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                    text="Add More"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <Button
                  className="mr-2"
                  outlined
                  size="small"
                  text="Cancel"
                  fullWidth={false}
                  onClick={() => router.push("/admin/inventory")}
                />
                <Button
                  className="mr-2 !min-w-[125px] !text-base"
                  htmlType="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  size="small"
                  text={slug ? "Update Inventory" : "Add Inventory"}
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

export default InventoryForm;
