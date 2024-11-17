import { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Input, message, Modal, Select, Steps } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import TextArea from "antd/es/input/TextArea";

const validationSchema = Yup.object().shape({
  costCenter: Yup.string(),
});

const CreateInventoryPopup = ({
  addInventoryVisible,
  setAddInventoryVisible,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    console.log(values);
    // const { status, data } = await login(values);
    // setSubmitting(false);
    // if (status === 200) {
    // message.success(data?.message);
    //   resetForm();
    // } else {
    //   message.error(data?.message);
    // }
  };

  return (
    <Formik
      initialValues={{
        costCenter: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        handleSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
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
                  onClick={handlePrev}
                  outlined
                  size="small"
                  text="Cancel"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
                <Button
                  className="mr-2"
                  htmlType="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
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
                <Select
                  name="category"
                  placeholder="Type / Category"
                  style={{ height: "36px" }}
                />
                <div className="md:col-span-3">
                  <Field
                    as={Input.TextArea}
                    name="details"
                    placeholder="Details"
                    maxLength={150}
                    className="!border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
                  />
                  <div className="text-right">0/150</div>

                  <div className="grid md:grid-cols-3 gap-4">
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
                    <Select
                      name="supplier"
                      placeholder="Vendor"
                      style={{ height: "36px" }}
                    />
                    <Field
                      as={DatePicker}
                      name="receivedDate"
                      placeholder="Received Date"
                      style={{ height: "36px" }}
                    />
                    {/* <Select
                      name="condition"
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
              </div>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateInventoryPopup;
