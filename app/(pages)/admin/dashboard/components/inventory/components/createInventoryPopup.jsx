import { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, message, Modal, Select, Steps } from "antd";
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
                />
                <InputField
                  name="category"
                  placeholder="Type / Category"
                  maxLength={128}
                />
                <div className="md:col-span-3">
                  <Field
                    as={TextArea}
                    name="description"
                    placeholder="Description"
                    maxLength={150}
                  />
                  <div className="text-right">0/150</div>

                  <Field
                    as={TextArea}
                    name="specDetails"
                    placeholder="Spec Details"
                    maxLength={500}
                  />
                  <div className="text-right">0/500</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Field
                      as={DatePicker}
                      placeholder="Received Date"
                      maxLength={10}
                      name="recievedDate"
                      style={{ height: "36px" }}
                    />
                    <Select
                      name="supplier"
                      placeholder="Suppliers"
                      style={{ height: "36px" }}
                    />
                    <Field
                      as={DatePicker}
                      name="installedDate"
                      placeholder="Installed Date"
                      style={{ height: "36px" }}
                    />
                    <Field
                      as={DatePicker}
                      name="originalManufactureDate"
                      placeholder="Original Manufacture Date"
                      style={{ height: "36px" }}
                    />
                    <Select
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
