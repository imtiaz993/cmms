"use client";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input, message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { addInventory } from "app/services/inventory";
import DatePickerField from "@/components/common/DatePickerField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { useEffect, useState } from "react";
import { getFields } from "app/services/customFields";
import AddFieldPopup from "@/components/addFieldPopup";
import { useDispatch } from "react-redux";
import { updateInventory } from "app/redux/slices/inventoriesSlice";
import { useRouter } from "next/navigation";
import { LeftOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";

const CreateInventory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addFieldPopupVisible, setAddFieldPopupVisible] = useState(false);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const customFieldInitialValues = fields.reduce((acc, field) => {
    acc[field.uniqueKey] = "";
    return acc;
  }, {});

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
    description: Yup.string().required("Description is required"),
    part: Yup.string().required("Part number is required"),
    // category: Yup.string().required("Category is required"),
    // details: Yup.string().required("Details is required"),
    quantity: Yup.string().required("Quantity is required"),
    // price: Yup.string().required("Price is required"),
    location: Yup.string().required("Location is required"),
    // PO: Yup.string().required("PO is required"),
    // SO: Yup.string().required("SO is required"),
    invoiceNumber: Yup.string().required("Invoice number is required"),
    // supplier: Yup.string().required("Supplier is required"),
    receivedDate: Yup.date().required("Received Date is required"),
    site: Yup.string().required("Site is required"),
    tagId: Yup.string().required("Tag ID is required"),
    notes: Yup.string().required("Notes is required"),
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

    const { status, data } = await addInventory(payload);
    setSubmitting(false);
    if (status === 200) {
      message.success(data?.message);
      resetForm();
      dispatch(updateInventory(data.data));
      router.push("/admin/inventory");
    } else {
      message.error(data.error);
    }
  };

  return (
    <div className="ml-5 md:ml-10">
      <AddFieldPopup
        visible={addFieldPopupVisible}
        setVisible={setAddFieldPopupVisible}
        module="inventory"
        fields={fields}
        setFields={setFields}
      />
      <p className="text-sm text-[#828282]">
        Inventory {" > "} Add New Inventory
      </p>
      <div className="flex justify-between mt-4">
        <Button
          text="Back to Inventory"
          onClick={() => router.push("/admin/inventory")}
          className="!bg-[#3F3F3F] !border-none"
          fullWidth={false}
          prefix={<LeftOutlined />}
        />
        {/* <Button
          onClick={() => setAddFieldPopupVisible(true)}
          text="Manage Fields"
          outlined
          htmlType="button"
          fullWidth={false}
        /> */}
      </div>
      <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto mt-5 bg-primary shadow-custom rounded-lg p-4">
        <p className="text-2xl font-semibold mb-5">New Inventory Form</p>
        {!loading && (
          <Formik
            initialValues={{
              partName: "",
              part: "",
              category: "",
              details: "",
              quantity: "",
              price: "",
              location: "",
              PO: "",
              SO: "",
              invoiceNumber: "",
              supplier: "",
              receivedDate: null,
              ...customFieldInitialValues,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 font-semibold md:text-lg">
                    Inventory Information
                  </div>
                  <div className="flex items-center gap-3">
                    <InputField
                      name="site"
                      placeholder="Site"
                      className="!w-full"
                      label="Site"
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
                    <InputField
                      name="location"
                      placeholder="Location"
                      label="Location"
                    />
                    <Button
                      text="New"
                      className="!bg-[#4C4C51] !shadow-custom !border-white !h-11 mt-5 sm:mt-0"
                      // onClick={() => setAddSitePopupVisible(true)}
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

                  <div className="md:col-span-2 font-semibold md:text-lg">
                    Inventory Information
                  </div>
                  <InputField name="part" placeholder="Part #" label="Part #" />
                  <InputField
                    name="tagId"
                    placeholder="Tag ID"
                    label="Tag ID"
                  />
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
                    <label className="text-sm text-[#30343F] text-right min-w-[115px]">
                      Upload Image
                    </label>

                    <Button
                      className="!bg-green-600 !shadow-custom !border-white !h-11 mt-2"
                      // onClick={() => setAddDocPopupVisible(true)}
                      fullWidth={false}
                      prefix={<UploadOutlined />}
                      text="Choose Image"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <h1 className="font-semibold">Custom Fields:</h1>
                  </div>
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
                    text="Add Inventory"
                    fullWidth={false}
                  />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default CreateInventory;
