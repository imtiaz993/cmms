import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { DatePicker, Input, Modal, Select } from "antd";
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
                <SelectField
                  name="delayReason"
                  options={[
                    { value: "contractor", label: "Contractor" },
                    { value: "men", label: "Men" },
                  ]}
                  placeholder="Delay Reason"
                />
                <DatePickerField
                  name="resolutionDate"
                  placeholder="Resolution Date"
                />
                <div className="col-span-2 -mb-4">
                  <TextAreaField
                    name="note"
                    placeholder="Note"
                    maxLength={150}
                  />
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDelayReasonPopup;
