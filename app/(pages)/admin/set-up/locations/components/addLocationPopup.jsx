import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Form, Modal } from "antd";
import { createLocation } from "app/services/setUp/locations";
import { Formik } from "formik";
import * as Yup from "yup";

const AddLocationPopup = ({ visible, setVisible }) => {
  const initialValues = {
    site: "",
    location: "",
  };
  const validationSchema = Yup.object({
    site: Yup.string().required("Site is required"),
    location: Yup.string().required("Location name is required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    console.log("Submitted");
    const { status, data } = await createLocation(values);
    setSubmitting(false);
    if (status === 200) {
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
              title={
                <h1 className="text-lg md:text-2xl mb-5">Add a Location</h1>
              }
              open={visible}
              onCancel={() => {
                setVisible(false);
                resetForm();
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
                    disabled={false}
                  />

                  <Button
                    className=""
                    onClick={handleSubmit}
                    size="small"
                    text="Add"
                    fullWidth={false}
                    disabled={false}
                  />
                </div>
              }
              width={600}
            >
              <SelectField
                name="site"
                placeholder="Select site"
                label="Site"
                required
              />
              <div className="mt-5">
                <InputField
                  name="location"
                  placeholder="Enter location name"
                  label="Location"
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

export default AddLocationPopup;
