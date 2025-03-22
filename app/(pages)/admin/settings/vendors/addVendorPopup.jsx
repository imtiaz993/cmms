import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Form, message, Modal } from "antd";
import { addVendor } from "app/services/common";
import { Formik } from "formik";
import * as Yup from "yup";

const AddVendorPopup = ({ visible, setVendors, setVisible }) => {
  const initialValues = {
    name: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Vendor name is required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await addVendor(values);
    setSubmitting(false);
    if (status === 200) {
      setVendors && setVendors((prev) => [...prev, data.data]);
      message.success(data.message);
      resetForm();
      setVisible(false);
    } else {
      message.error(data.error);
    }
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
              title={<h1 className="text-lg md:text-2xl mb-5">Add a Vendor</h1>}
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
                  name="name"
                  placeholder="Enter Vendor name"
                  label="Vendor"
                  required
                />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddVendorPopup;
