import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Input, message, Modal, Select } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { addInventory } from "app/services/inventory";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  physicalLocation: Yup.string()
    .required("Physical Location is required")
    .max(128),
  makeModel: Yup.string().required("Make and/or Model is required").max(128),
  partItem: Yup.string().required("Part # / Item # is required").max(128),
  assetNumber: Yup.string().required("Asset # / Serial # is required").max(128),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number"),
  category: Yup.string().required("Type / Category is required").max(128),
  description: Yup.string().max(
    150,
    "Description cannot exceed 150 characters"
  ),
  specDetails: Yup.string().max(
    500,
    "Spec Details cannot exceed 500 characters"
  ),
  recievedDate: Yup.date().required("Received Date is required"),
  supplier: Yup.string().required("Supplier is required"),
  installedDate: Yup.date().required("Installed Date is required"),
  originalManufactureDate: Yup.date().required(
    "Original Manufacture Date is required"
  ),
  condition: Yup.string().required("Condition is required"),
});

const CreateInventoryPopup = ({
  addInventoryVisible,
  setAddInventoryVisible,
}) => {
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await addInventory(values);
    setSubmitting(false);
    if (status === 200) {
      message.success(data.message);
      resetForm();
      setAddInventoryVisible(false);
    } else {
      message.error(data.error);
    }
  };

  const FormikDatePicker = ({ field, form, ...props }) => {
    const handleChange = (date, dateString) => {
      form.setFieldValue(field.name, dateString);
    };

    return (
      <DatePicker
        {...field}
        {...props}
        onChange={handleChange}
        value={field.value ? dayjs(field.value) : null}
      />
    );
  };

  const FormikSelect = ({ field, form, options, ...props }) => {
    const handleChange = (value) => {
      form.setFieldValue(field.name, value);
    };

    return (
      <Select
        {...props}
        value={field.value || undefined}
        onChange={handleChange}
        onBlur={() => form.setFieldTouched(field.name, true)}
        options={options}
      />
    );
  };

  return (
    <Formik
      initialValues={{
        physicalLocation: "",
        makeModel: "",
        partItem: "",
        assetNumber: "",
        quantity: "",
        category: "",
        description: "",
        specDetails: "",
        recievedDate: null,
        supplier: "",
        installedDate: null,
        originalManufactureDate: null,
        condition: "",
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
              <h1 className="text-lg md:text-2xl mb-5">Add New Inventory</h1>
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
              <div className="grid md:grid-cols-3 gap-4">
                <InputField
                  name="physicalLocation"
                  placeholder="Physical Location"
                  maxLength={128}
                />
                <InputField
                  name="makeModel"
                  placeholder="Make and/or Model"
                  maxLength={128}
                />
                <InputField
                  name="partItem"
                  placeholder="Part # / Item #"
                  maxLength={128}
                />
                <InputField
                  name="assetNumber"
                  placeholder="Asset # / Serial #"
                  maxLength={128}
                />
                <InputField
                  name="quantity"
                  placeholder="Quantity"
                  maxLength={50}
                  type="number"
                />
                <InputField
                  name="category"
                  placeholder="Type / Category"
                  maxLength={128}
                />
                <div className="md:col-span-3">
                  <Field
                    as={Input.TextArea}
                    name="description"
                    placeholder="Description"
                    maxLength={150}
                    className="!border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
                  />
                  <div className="text-right">0/150</div>
                  <Field
                    as={Input.TextArea}
                    name="specDetails"
                    placeholder="Spec Details"
                    maxLength={500}
                    className="!border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
                  />
                  <div className="text-right">0/500</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Field
                      component={FormikDatePicker}
                      placeholder="Received Date"
                      name="recievedDate"
                      style={{ height: "36px" }}
                    />
                    <Field
                      name="supplier"
                      component={FormikSelect}
                      placeholder="Suppliers"
                      style={{ height: "36px" }}
                      options={[
                        { value: "supplier1", label: "Supplier 1" },
                        { value: "supplier2", label: "Supplier 2" },
                        { value: "supplier3", label: "Supplier 3" },
                        { value: "supplier4", label: "Supplier 4" },
                        { value: "supplier5", label: "Supplier 5" },
                      ]}
                    />
                    <Field
                      component={FormikDatePicker}
                      name="installedDate"
                      placeholder="Installed Date"
                      style={{ height: "36px" }}
                    />
                    <Field
                      component={FormikDatePicker}
                      name="originalManufactureDate"
                      placeholder="Original Manufacture Date"
                    />
                    <Field
                      name="condition"
                      component={FormikSelect}
                      placeholder="Condition"
                      options={[
                        { label: "Good", value: "good" },
                        { label: "Bad", value: "bad" },
                        { label: "Damaged", value: "damaged" },
                        { label: "New", value: "new" },
                        { label: "Rebuilt", value: "rebuilt" },
                        { label: "Re-Certified", value: "re-certified" },
                      ]}
                      style={{ height: "36px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateInventoryPopup;
