import Button from "@/components/common/Button";
import { DatePicker, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Field, Form, Formik } from "formik";

const AddDelayReasonPopup = ({ visible, setVisible }) => {
  return (
    <div>
      <Formik
        initialValues={{}}
        validationSchema={{}}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              maskClosable={false}
              title="Add Delay Reason"
              open={visible}
              onCancel={() => setVisible(false)}
              footer={
                <div>
                  <Button
                    className="mr-2"
                    onClick={() => setVisible(false)}
                    outlined
                    size="small"
                    text="Cancel"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    size="small"
                    text="Add"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field
                  as={Select}
                  name="delayReason"
                  options={[
                    { value: "contractor", label: "Contractor" },
                    { value: "men", label: "Men" },
                  ]}
                  placeholder="Delay Reason"
                  style={{ height: "36px" }}
                  className="w-full"
                />
                <Field
                  as={DatePicker}
                  name="resolutionDate"
                  placeholder="Resolution Date"
                  style={{ height: "36px" }}
                  className="w-full"
                />
                <Field
                  as={TextArea}
                  name="note"
                  placeholder="Note"
                  className="w-full col-span-2"
                />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDelayReasonPopup;
