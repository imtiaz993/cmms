import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input, message, Modal } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { addInventory } from "app/services/inventory";
import DatePickerField from "@/components/common/DatePickerField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";

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
                {/* <InputField
                  name="physicalLocation"
                  placeholder="Physical Location"
                  maxLength={128}
                /> */}
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
                <SelectField name="category" placeholder="Type / Category" />
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
                <InputField name="price" placeholder="Price" maxLength={128} />
                <InputField
                  name="location"
                  placeholder="Location"
                  maxLength={128}
                />

                {/* <Field
                    as={Input.TextArea}
                    name="specDetails"
                    placeholder="Spec Details"
                    maxLength={500}
                    className="!border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
                  />
                  <div className="text-right">0/500</div> */}
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
                {/* <Select
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
                    /> */}
              </div>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateInventoryPopup;
