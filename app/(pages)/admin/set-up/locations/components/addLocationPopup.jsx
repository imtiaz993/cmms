import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Form, message, Modal } from "antd";
import { updateSystem } from "app/redux/slices/systemsSlice";
import { createSystem } from "app/services/setUp/systems";
import { Formik } from "formik";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const AddLocationPopup = ({ visible, setLocations, setVisible }) => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.location.location);
  const initialValues = {
    site: "",
    system: "",
  };
  const validationSchema = Yup.object({
    site: Yup.string().required("Site is required"),
    system: Yup.string().required("System name is required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await createSystem(values);
    setSubmitting(false);
    if (status === 200) {
      setLocations((prev) => [...prev, data.data]);
      dispatch(updateSystem(data?.data));
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
                options={locations.map((i) => ({
                  label: i.site,
                  value: i._id,
                }))}
              />
              <div className="mt-5">
                <InputField
                  name="system"
                  placeholder="Enter system name"
                  label="System"
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
