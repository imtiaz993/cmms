import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Modal, Select, Steps } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const validationSchema = Yup.object().shape({
  costCenter: Yup.string(),
});

const CreateAssetPopup = ({ addAssetVisible, setAddAssetVisible }) => {
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

  const steps = [
    {
      title: "Asset Summary",
    },
    {
      title: "Asset Details",
    },
    {
      title: "Asset Maintenance Info",
    },
    {
      title: "Maintenance Status Info   ",
    },
  ];

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
            title={<h1 className="text-lg md:text-2xl mb-5">Add New Asset</h1>}
            open={addAssetVisible}
            onCancel={() => setAddAssetVisible(false)}
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
                    text="Add Asset"
                    fullWidth={false}
                  />
                )}
              </div>
            }
            width={1000}
            bodyStyle={{
              height: "400px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="mb-5 md:mb-10">
              <Steps current={currentStep} items={steps} />
            </div>

            <div>
              {currentStep === 0 && (
                <div className="grid md:grid-cols-3 gap-4">
                  <InputField
                    name="costCenter"
                    placeholder="Cost Center"
                    maxLength={128}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="Parent Asset"
                    maxLength={128}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="Accounting Dept."
                  />
                  <InputField name="costCenter" placeholder="Subunit" />
                  <InputField
                    name="costCenter"
                    placeholder="Asset Class"
                    maxLength={128}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="Alternative ID #"
                    maxLength={128}
                  />
                </div>
              )}

              {currentStep === 1 && (
                <div className="grid md:grid-cols-3 gap-4">
                  <InputField
                    name="costCenter"
                    placeholder="Physical Location"
                    maxLength={128}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="Asset #"
                    maxLength={128}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="RFID/Barcode"
                    maxLength={128}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="Installed Date"
                    maxLength={128}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="Serial #"
                    maxLength={128}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="OEM Serial #"
                    maxLength={50}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="Estimated Life (months)"
                    maxLength={128}
                  />
                  <InputField
                    name="costCenter"
                    placeholder="Downtime Cost Per Hour"
                    maxLength={128}
                  />
                  <Select placeholder="Unit" />
                  <div className="md:col-span-3">
                    <InputField
                      name="costCenter"
                      placeholder="Description"
                      maxLength={150}
                    />
                    <div className="text-right">0/150</div>
                  </div>
                  <div className="md:col-span-3">
                    <InputField
                      name="costCenter"
                      placeholder="Spec Details"
                      maxLength={500}
                    />
                    <div className="text-right">0/500</div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid md:grid-cols-3 gap-4">
                  <Select placeholder="Criticality" />
                  <InputField
                    placeholder="Original Mfr. Date (MM/DD/YYYY)"
                    maxLength={10}
                    name="costCenter"
                  />
                  <Select placeholder="Condition" />
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid md:grid-cols-3 gap-4">
                  <Select placeholder="Maint. Status" />
                  <InputField
                    name="costCenter"
                    placeholder="Maint. Start Date (MM/DD/YYYY)"
                    maxLength={10}
                  />
                </div>
              )}
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAssetPopup;
