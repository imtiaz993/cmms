import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Form, message, Modal } from "antd";
import { updateLocation } from "app/redux/slices/locationsSlice";
import { createSite } from "app/services/setUp/sites";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const AddSitePopup = ({ visible, setSites, setVisible }) => {
  const dispatch = useDispatch();
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
    site: Yup.string().required("Site name is required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await createSite(values);
    setSubmitting(false);
    if (status === 200) {
      setSites && setSites((prev) => [...prev, data.data]);
      dispatch(updateLocation(data?.data));
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
