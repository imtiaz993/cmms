import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Form, Modal } from "antd";
import { createSite } from "app/services/setUp/sites";
import { Formik } from "formik";
import * as Yup from "yup";

const AddSitePopup = ({ visible, setVisible }) => {
  const initialValues = {
    site: "",
    description: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  };
  const validationSchema = Yup.object({
    site: Yup.string().required("Site is required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    console.log("Submitted", values);
    const { status, data } = await createSite(values);
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
              title={<h1 className="text-lg md:text-2xl mb-5">Add a Site</h1>}
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
              <div className="grid gap-5">
                <InputField
                  name="site"
                  placeholder="Enter site name"
                  label="Site"
                  required
                />
                <InputField
                  name="description"
                  placeholder="Enter site description"
                  label="Description"
                />
                <InputField
                  name="address"
                  placeholder="Enter address"
                  label="Address"
                />
                <InputField
                  name="appartment"
                  placeholder="Enter appartment"
                  label="Apt./Suite #"
                />
                <InputField name="city" placeholder="Enter city" label="City" />
                <InputField
                  name="state"
                  placeholder="Enter state"
                  label="State"
                />
                <InputField
                  name="zip"
                  placeholder="Enter zip"
                  label="Zip Code"
                />
                <InputField
                  name="country"
                  placeholder="Enter country"
                  label="Country"
                />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSitePopup;
