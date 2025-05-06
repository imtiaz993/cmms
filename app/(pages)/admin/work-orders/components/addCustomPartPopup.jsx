import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Form, Modal } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

const AddCustomPartPopup = ({ visible, setCustomParts, setVisible }) => {
  const initialValues = {
    partNumber: "",
    quantity: "",
    description: "",
  };
  const validationSchema = Yup.object({
    partNumber: Yup.string().required("Part Number is required"),
    quantity: Yup.string().required("Quantity is required"),
    description: Yup.string(),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    setCustomParts((prev) => [
      ...prev,
      { ...values, selectedQuantity: values.quantity },
    ]);
    resetForm();
    setVisible(false);
  };
  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              maskClosable={false}
              title={
                <h1 className="text-lg md:text-2xl mb-5">Add a new Part</h1>
              }
              open={visible}
              onCancel={() => {
                if (!isSubmitting) {
                  setVisible(false);
                  resetForm();
                }
              }}
              footer={
                <div>
                  <Button
                    className="mr-4"
                    onClick={() => {
                      setVisible(false);
                      resetForm();
                    }}
                    outlined
                    size="small"
                    text="Cancel"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />

                  <Button
                    className=""
                    onClick={handleSubmit}
                    size="small"
                    text="Add"
                    fullWidth={false}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  />
                </div>
              }
              width={600}
            >
              <div className="mt-5">
                <InputField
                  name="partNumber"
                  placeholder="Enter part number"
                  label="Part Number"
                  required
                />
              </div>
              <div className="mt-5">
                <InputField
                  name="quantity"
                  placeholder="Enter quantity"
                  label="Quantity"
                  required
                />
              </div>
              <div className="mt-5">
                <InputField
                  name="description"
                  placeholder="Enter description"
                  label="Description"
                />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCustomPartPopup;
