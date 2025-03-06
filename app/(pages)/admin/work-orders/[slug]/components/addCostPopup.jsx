import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TimePickerField from "@/components/common/TimePickerField";
import { currencies } from "@/constants/currencies";
import { message, Modal } from "antd";
import { addCostinWO } from "app/services/workOrders";
import { Form, Formik } from "formik";
import * as Yup from "yup"; // Importing Yup for validation

const AddCostPopup = ({ visible, setVisible, setWorkOrder, slug }) => {
  // Define initial values for the form
  const initialValues = {
    createdDate: null,
    createdTime: null,
    costType: "",
    item: "",
    description: "",
    quantity: "",
    costEach: "",
    currency: "USD",
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    createdDate: Yup.date().required("Created Date is required"),
    createdTime: Yup.string().required("Created Time is required"),
    costType: Yup.string().required("Cost Type is required"),
    item: Yup.string().required("Item is required"),
    description: Yup.string().required("Description is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be a positive number")
      .integer("Quantity must be an integer"),
    costEach: Yup.number()
      .required("Cost Each is required")
      .positive("Cost Each must be a positive number"),
    currency: Yup.string().required("Currency is required"),
  });

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    // Handle submit logic here
    const { status, data } = await addCostinWO({
      ...values,
      workOrder: slug,
    });
    if (status === 200) {
      setVisible(false);
      setWorkOrder((prev) => ({ ...prev, costs: [...prev.costs, data?.data] }));
      resetForm();
      message.success(data.message || "Cost added successfully");
    } else {
      message.error(data.message || "Failed to add cost");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, handleSubmit, submitForm }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              maskClosable={false}
              title="Add Cost Popup"
              open={visible}
              onCancel={() => setVisible(false)}
              footer={
                <div className="mt-7">
                  <Button
                    className="mr-2"
                    onClick={() => setVisible(false)}
                    outlined
                    size="small"
                    text="Cancel"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />

                  <Button
                    className=""
                    htmlType="submit"
                    onClick={submitForm}
                    size="small"
                    text="Add"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
              width={800}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <DatePickerField
                  name="createdDate"
                  placeholder="Created Date"
                />
                <TimePickerField
                  name="createdTime"
                  placeholder="Created Time"
                />
                <SelectField
                  name="costType"
                  placeholder="Cost Type"
                  options={[
                    { label: "Purchase Price", value: "purchasePrice" },
                    { label: "Direct Cost", value: "directCost" },
                    {
                      label: "Third Party Labor Cost",
                      value: "thirdPartyLaborCost",
                    },
                    { label: "Parts", value: "parts" },
                    {
                      label: "Third Party Parts & Labor",
                      value: "thirdPartyParts",
                    },
                    {
                      label: "Third Party Material Cost",
                      value: "thirdPartyMaterial",
                    },
                    { label: "State Sales Tax", value: "stateSalesTax" },
                  ]}
                  style={{ height: "36px" }}
                />
                <InputField name="item" placeholder="Item" />
                <InputField name="description" placeholder="Description" />
                <InputField name="quantity" placeholder="Quantity" />
                <InputField name="costEach" placeholder="Cost Each" />
                <SelectField
                  name="currency"
                  placeholder="Currency"
                  options={currencies}
                />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCostPopup;
