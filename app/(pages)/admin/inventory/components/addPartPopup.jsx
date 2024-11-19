import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Modal, Select, Steps } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import SelectField from "@/components/common/SelectField";

const AddPartPopup = ({ visible, setVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    {
      title: "Select Inventory Item",
    },
    {
      title: "Complete Inventory Record",
    },
  ];

  const validationSchema = Yup.object().shape({
    inventoryClass: Yup.string().required("Inventory class is required"),
    searchField: Yup.string().required("Search field is required"),
  });

  return (
    <Formik
      initialValues={{
        inventoryClass: "",
        searchField: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        message.success("Part added successfully!");
        resetForm();
        setVisible(false);
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Modal
            maskClosable={false}
            title={<h1 className="text-lg md:text-2xl mb-5">Add New Parts</h1>}
            open={visible}
            onCancel={() => setVisible(false)}
            footer={
              <div>
                {currentStep > 0 && (
                  <Button
                    className="mr-2"
                    onClick={handlePrev}
                    outlined
                    size="small"
                    text="Previous"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                )}
                {currentStep < steps.length - 1 && (
                  <Button
                    className="mr-2"
                    onClick={handleNext}
                    size="small"
                    text="Next"
                    fullWidth={false}
                  />
                )}
                {currentStep === steps.length - 1 && (
                  <Button
                    className="mr-2"
                    htmlType="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    size="small"
                    text="Add"
                    fullWidth={false}
                  />
                )}
              </div>
            }
            width={800}
            bodyStyle={{
              height: "400px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="mb-5">
              <Steps current={currentStep} items={steps} />
            </div>

            <div>
              {currentStep === 0 && (
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      name="searchField"
                      placeholder="Search"
                      maxLength={128}
                    />
                    <SelectField
                      name="inventoryClass"
                      placeholder="Inventory Class"
                      options={[
                        { label: "Drill Pipe", value: "Drill Pipe" },
                        { label: "Other", value: "Other" },
                      ]}
                    />
                  </div>
                  <p className="text-center my-20">
                    <ExclamationCircleOutlined /> No inventory items available.
                  </p>
                </div>
              )}

              {currentStep === 1 && (
                <div className="grid grid-cols-1 gap-4">
                  <p className="text-center">No inventory items available.</p>
                </div>
              )}
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddPartPopup;
