import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Form, Modal } from "antd";
import { Formik } from "formik";

const AddLocationPopup = ({ visible, setVisible }) => {
  const handleSubmit = () => {
    console.log("Submitted");
  };
  return (
    <div className="">
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              maskClosable={false}
              title={
                <h1 className="text-lg md:text-2xl mb-5">Add a Location</h1>
              }
              open={visible}
              onCancel={() => setVisible(false)}
              footer={
                <div>
                  <Button
                    className="mr-4"
                    onClick={() => setVisible(false)}
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
