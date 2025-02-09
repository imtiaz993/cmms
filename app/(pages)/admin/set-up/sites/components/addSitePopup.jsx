import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Form, Modal } from "antd";
import { Formik } from "formik";

const AddSitePopup = ({ visible, setVisible }) => {
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
              title={<h1 className="text-lg md:text-2xl mb-5">Add a Site</h1>}
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
