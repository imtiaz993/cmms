import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Modal, Select, Checkbox } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const validationSchema = Yup.object().shape({
  rigNumber: Yup.string().required("Required"),
  parentAsset: Yup.string().required("Required"),
  date: Yup.date().required("Required"),
  recurring: Yup.boolean(),
  inspectedBy: Yup.string().required("Required"),
  supervisor: Yup.string().required("Required"),
});

const CreatePlannedWOPopup = ({ visible, setVisible }) => {
  return (
    <Formik
      initialValues={{
        rigNumber: "",
        parentAsset: "",
        date: null,
        recurring: false,
        inspectedBy: "",
        supervisor: "",
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
                Add New Planned Work Order
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
            width={600}
          >
            <div className="mt-4 grid md:grid-cols-2 gap-4 w-full items-end md:items-center">
              <InputField name="rigNumber" placeholder="Rig #" />
              <InputField name="parentAsset" placeholder="Parent Asset" />
              <Field
                as={DatePicker}
                name="date"
                placeholder="Date"
                style={{ height: "36px", width: "100%" }}
              />
              <div className="flex items-center">
                <Field name="recurring" type="checkbox" as={Checkbox}>
                  Recurring
                </Field>
              </div>
              <InputField name="inspectedBy" placeholder="Inspected By" />
              <InputField name="supervisor" placeholder="Supervisor" />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePlannedWOPopup;