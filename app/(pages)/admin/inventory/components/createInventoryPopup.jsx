import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input, message, Modal } from "antd";
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

const CreateInventoryPopup = ({
  addInventoryVisible,
  setAddInventoryVisible,
}) => {
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

  // Generate initial values for custom fields
  const customFieldInitialValues = fields.reduce((acc, field) => {
    acc[field.uniqueKey] = "";
    return acc;
  }, {});

  // Generate validation schema for custom fields
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
    partName: Yup.string().required("Part name is required"),
    partItem: Yup.string().required("Part item is required"),
    category: Yup.string().required("Category is required"),
    details: Yup.string().required("Details is required"),
    quantity: Yup.string().required("Quantity is required"),
    price: Yup.string().required("Price is required"),
    location: Yup.string().required("Location is required"),
    PO: Yup.string().required("PO is required"),
    SO: Yup.string().required("SO is required"),
    invoiceNumber: Yup.string().required("Invoice number is required"),
    supplier: Yup.string().required("Supplier is required"),
    receivedDate: Yup.date().required("Received Date is required"),
    ...customFieldValidations, // Include custom field validations
  });

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    // Extract custom field values
    const customFields = fields.map((field) => ({
      uniqueKey: field.uniqueKey,
      value: values[field.uniqueKey],
    }));

    // Remove custom fields from values to get standard fields
    const standardValues = { ...values };
    fields.forEach((field) => {
      delete standardValues[field.uniqueKey];
    });

    // Prepare payload
    const payload = {
      ...standardValues,
      customFields,
    };

    const { status, data } = await addInventory(payload);
    setSubmitting(false);
    if (status === 200) {
      message.success(data?.message);
      resetForm();
      dispatch(updateInventory(data.data)); // Store inventory in Redux
      setAddInventoryVisible(false);
    } else {
      message.error(data.error);
    }
  };

  return (
    <>
      {" "}
      <AddFieldPopup
        visible={addFieldPopupVisible}
        setVisible={setAddFieldPopupVisible}
        module="inventory"
        fields={fields}
        setFields={setFields}
      />
      {!loading && (
        <Formik
          initialValues={{
            partName: "",
            partItem: "",
            category: "",
            details: "",
            quantity: "",
            price: "",
            location: "",
            PO: "",
            SO: "",
            invoiceNumber: null,
            supplier: "",
            receivedDate: null,
            ...customFieldInitialValues, // Include custom fields
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values, setSubmitting, resetForm);
          }}
        >
          {({ isSubmitting, handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Modal
                maskClosable={false}
                title={
                  <h1 className="text-lg md:text-2xl mb-5">
                    Add New Inventory
                  </h1>
                }
                open={addInventoryVisible}
                onCancel={() => setAddInventoryVisible(false)}
                footer={
                  <div>
                    <Button
                      className="mr-2"
                      onClick={() => setAddInventoryVisible(false)}
                      outlined
                      size="small"
                      text="Cancel"
                      fullWidth={false}
                      disabled={isSubmitting}
                    />
                    <Button
                      className="mr-2 !min-w-[125px]"
                      htmlType="submit"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      size="small"
                      text="Add Inventory"
                      fullWidth={false}
                    />
                  </div>
                }
                width={1000}
                bodyStyle={{
                  height: "400px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <div>
                  <div className="flex justify-end mb-5">
                    <Button
                      onClick={() => setAddFieldPopupVisible(true)}
                      text="Manage Fields"
                      outlined
                      htmlType="button"
                      fullWidth={false}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <InputField
                      name="partName"
                      placeholder="Part Name"
                      maxLength={128}
                    />
                    <InputField
                      name="partItem"
                      placeholder="Part # / Item #"
                      maxLength={128}
                    />
                    <SelectField
                      name="category"
                      placeholder="Type / Category"
                      options={[{ value: "Cat 1", label: "Cat 1" }]}
                    />
                    <div className="md:col-span-3 -mb-4">
                      <TextAreaField
                        name="details"
                        placeholder="Details"
                        maxLength={150}
                      />
                    </div>

                    <InputField
                      name="quantity"
                      placeholder="Quantity"
                      maxLength={50}
                    />
                    <InputField
                      name="price"
                      placeholder="Price"
                      maxLength={128}
                    />
                    <InputField
                      name="location"
                      placeholder="Location"
                      maxLength={128}
                    />

                    <InputField name="PO" placeholder="PO" maxLength={128} />
                    <InputField name="SO" placeholder="SO" maxLength={128} />
                    <InputField
                      name="invoiceNumber"
                      placeholder="Inv. #"
                      maxLength={128}
                    />
                    <SelectField
                      name="supplier"
                      placeholder="Vendor"
                      options={[
                        { value: "supplier1", label: "Supplier 1" },
                        { value: "supplier2", label: "Supplier 2" },
                        { value: "supplier3", label: "Supplier 3" },
                        { value: "supplier4", label: "Supplier 4" },
                        { value: "supplier5", label: "Supplier 5" },
                      ]}
                    />
                    <DatePickerField
                      name="receivedDate"
                      placeholder="Received Date"
                    />
                    <div className="md:col-span-3 mt-5">
                      <h1 className="text-base font-medium">Custom Fields:</h1>
                    </div>
                    {fields.map((field) => {
                      switch (field.type) {
                        case "text":
                          return (
                            <InputField
                              key={field.uniqueKey}
                              name={field.uniqueKey}
                              placeholder={field.name}
                            />
                          );
                        case "number":
                          return (
                            <InputField
                              key={field.uniqueKey}
                              name={field.uniqueKey}
                              placeholder={field.name}
                              type="number"
                            />
                          );
                        case "dropdown":
                          return (
                            <SelectField
                              key={field.uniqueKey}
                              name={field.uniqueKey}
                              placeholder={field.name}
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
                              placeholder={field.name}
                            />
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                </div>
              </Modal>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default CreateInventoryPopup;
