import { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Modal, Select } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import TextArea from "antd/es/input/TextArea";

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

  // const steps = [
  //   {
  //     title: "Summary",
  //   },
  //   {
  //     title: "Details",
  //   },
  //   {
  //     title: "Maintenance",
  //   },
  //   {
  //     title: "Maintenance Status",
  //   },
  // ];

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
                <Button
                  className="mr-2"
                  htmlType="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  size="small"
                  text="Add Asset"
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
                  name="costCenter"
                  placeholder="Physical Location"
                  maxLength={128}
                />
                <InputField
                  name="costCenter"
                  placeholder="Parent Asset"
                  maxLength={128}
                />
                <InputField name="costCenter" placeholder="Accounting Dept." />
                <InputField
                  name="costCenter"
                  placeholder="Parent Asset"
                  maxLength={128}
                />
                <InputField name="costCenter" placeholder="Child Asset" />
                <InputField
                  name="costCenter"
                  placeholder="Make, Model, Part #"
                  maxLength={128}
                />
                <InputField
                  name="costCenter"
                  placeholder="Asset #"
                  maxLength={128}
                />
                <InputField
                  name="costCenter"
                  placeholder="Serial #"
                  maxLength={128}
                />
                <InputField
                  name="costCenter"
                  placeholder="RFID/Barcode"
                  maxLength={128}
                />
                <div className="md:col-span-3">
                  <Field
                    as={TextArea}
                    name="costCenter"
                    placeholder="Description"
                    maxLength={150}
                  />
                  <div className="text-right">0/150</div>

                  <Field
                    as={TextArea}
                    name="costCenter"
                    placeholder="Spec Details"
                    maxLength={500}
                  />
                  <div className="text-right">0/500</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <InputField
                      name="costCenter"
                      placeholder="Installed Date"
                      maxLength={128}
                    />
                    <InputField
                      name="costCenter"
                      placeholder="Suppliers"
                      maxLength={128}
                    />

                    <Select placeholder="Criticality" />
                    <InputField
                      placeholder="Original Mfr. Date (MM/DD/YYYY)"
                      maxLength={10}
                      name="costCenter"
                    />
                    <Select placeholder="Condition" />

                    <Select placeholder="Maint. Status" />
                    <InputField
                      name="costCenter"
                      placeholder="Maint. Start Date (MM/DD/YYYY)"
                      maxLength={10}
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

export default CreateAssetPopup;
