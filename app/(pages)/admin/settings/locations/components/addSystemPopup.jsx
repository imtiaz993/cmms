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

const AddSystemPopup = ({ visible, setSystems, setVisible }) => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.location.location);
  const initialValues = {
    system: "",
  };
  const validationSchema = Yup.object({
    system: Yup.string().required("System name is required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await createSystem(values);
    setSubmitting(false);
    if (status === 200) {
      setSystems && setSystems((prev) => [...prev, data.data]);
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
              title={<h1 className="text-lg md:text-2xl mb-5">Add a System</h1>}
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

export default AddSystemPopup;
