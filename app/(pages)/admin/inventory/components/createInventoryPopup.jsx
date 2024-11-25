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
});

const CreateInventoryPopup = ({
  addInventoryVisible,
  setAddInventoryVisible,
  handleFetchInventory,
}) => {
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await addInventory(values);
    setSubmitting(false);
    if (status === 200) {
      message.success(data.message);
      resetForm();
      handleFetchInventory()
      setAddInventoryVisible(false);
    } else {
      message.error(data.error);
    }
  };

  return (
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
                <InputField name="price" placeholder="Price" maxLength={128} />
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
              </div>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateInventoryPopup;
