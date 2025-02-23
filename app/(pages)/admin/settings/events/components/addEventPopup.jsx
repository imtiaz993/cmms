import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Form, message, Modal } from "antd";
import { createEvent } from "app/services/setUp/events";
import { Formik } from "formik";
import * as Yup from "yup";

const AddEventPopup = ({ visible, setEvents, setVisible }) => {
  const initialValues = {
    event: "",
  };
  const validationSchema = Yup.object({
    event: Yup.string().required("Event Name is required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    console.log("Submitted");
    const { status, data } = await createEvent(values);
    setSubmitting(false);
    if (status === 200) {
      setEvents((prev) => [...prev, data.data]);
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
              title={<h1 className="text-lg md:text-2xl mb-5">Add a Event</h1>}
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
