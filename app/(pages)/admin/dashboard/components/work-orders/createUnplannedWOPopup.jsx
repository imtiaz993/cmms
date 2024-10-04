import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, message, Modal, Select, TimePicker } from "antd";
import InputField from "@/components/common/InputField";
import TextArea from "antd/es/input/TextArea";
import Button from "@/components/common/Button";

const validationSchema = Yup.object().shape({
  costCenter: Yup.string(),
});

const CreateUnplannedWOPopup = ({ visible, setVisible }) => {
  return (
    <Formik
      initialValues={{
        costCenter: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        handleSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Modal
            maskClosable={false}
            title={
              <h1 className="text-lg md:text-2xl mb-5">
                Add New Unplanned Work Order
              </h1>
            }
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
                  className=""
                  onClick={() => setVisible(false)}
                  size="small"
                  text="Create Work Order"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
              </div>
            }
            width={1000}
            // bodyStyle={{
            //   height: "400px",
            //   overflowY: "auto",
            //   overflowX: "hidden",
            // }}
          >
            <div>
              <div className="mt-4 grid md:grid-cols-3 gap-4 w-full items-end md:items-center">
                <div className="w-full">
                  <Field
                    as={DatePicker}
                    name="createdDate"
                    placeholder="Created Date"
                    style={{ height: "36px", width: "100%" }}
                  />
                </div>
                <div className="w-full">
                  <Field
                    as={TimePicker}
                    name="time"
                    placeholder="Time"
                    style={{ height: "36px", width: "100%" }}
                  />
                </div>

                <div className="w-full">
                  <Field
                    as={Select}
                    name="priority"
                    placeholder="Priority"
                    style={{ height: "36px", width: "100%" }}
                  />
                </div>

                <div className="w-full">
                  <InputField
                    name="costCenter"
                    placeholder="Cost Center"
                    maxLength={128}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="assetNumber"
                    placeholder="Asset Number"
                    maxLength={128}
                  />
                </div>
                <div className="w-full">
                  <Field
                    as={Select}
                    name="assetDown"
                    placeholder="Asset Down?"
                    style={{ height: "36px", width: "100%" }}
                    options={[
                      { label: "Yes", value: "Yes" },
                      { label: "No", value: "No" },
                    ]}
                  />
                </div>
                <div className="w-full col-span-3">
                  <Field
                    as={TextArea}
                    name="problem"
                    placeholder="Problem"
                    style={{ height: "80px", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUnplannedWOPopup;
