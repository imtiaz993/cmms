import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Form, Input, Modal } from "antd";
import { ErrorMessage, Field, Formik } from "formik";

const AddEventPopup = ({ visible, setVisible }) => {
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
              title={<h1 className="text-lg md:text-2xl mb-5">Add a Event</h1>}
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
              <InputField
                name="event"
                placeholder="Enter event name"
                label="Event"
                labelWidth
                required
              />
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEventPopup;
