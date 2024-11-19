import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Input, message, Modal, Select, TimePicker } from "antd";
import InputField from "@/components/common/InputField";
import TextArea from "antd/es/input/TextArea";
import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import SelectField from "@/components/common/SelectField";

const validationSchema = Yup.object().shape({
  issueIdentification: Yup.string().required("Required"),
  date: Yup.date().required("Required"),
  time: Yup.string().required("Required"),
  problemDescription: Yup.string().required("Required"),
  assetNum: Yup.string().required("Required"),
  affectedEquipment: Yup.string().required("Required"),
  immediateConcerns: Yup.string(),
  initialAssessment: Yup.string(),
  priorityLevel: Yup.string().required("Required"),
  assignedTechnician: Yup.string(),
  estimatedCompletionTime: Yup.string(),
  requiredTools: Yup.string(),
  statusUpdates: Yup.string(),
  checkIn1: Yup.string(),
  checkIn2: Yup.string(),
  checkIn3: Yup.string(),
  repairActions: Yup.string(),
  partsReplaced: Yup.string(),
  finalStatus: Yup.string(),
  summary: Yup.string(),
});

const CreateUnplannedWOPopup = ({ visible, setVisible }) => {
  return (
    <Formik
      initialValues={{
        issueIdentification: "",
        date: null,
        time: null,
        problemDescription: "",
        assetNum: "",
        affectedEquipment: "",
        immediateConcerns: "",
        initialAssessment: "",
        priorityLevel: "",
        assignedTechnician: "",
        estimatedCompletionTime: "",
        requiredTools: "",
        statusUpdates: "",
        checkIn1: "",
        checkIn2: "",
        checkIn3: "",
        repairActions: "",
        partsReplaced: "",
        finalStatus: "",
        summary: "",
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
          >
            <div className="mt-4 grid md:grid-cols-3 gap-4 w-full items-end md:items-center">
              <InputField
                name="issueIdentification"
                placeholder="Issue Identification"
              />
              <DatePickerField name="date" placeholder="Date" />
              <Field
                as={TimePicker}
                name="time"
                placeholder="Time"
                style={{ height: "36px", width: "100%" }}
              />
              <Field
                as={Input.TextArea}
                name="problemDescription"
                placeholder="Problem Description"
                style={{ height: "80px", width: "100%" }}
                className="col-span-3 !border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
              />
              <InputField name="assetNum" placeholder="Asset #" />
              <InputField
                name="affectedEquipment"
                placeholder="Affected Equipment"
              />
              <InputField
                name="immediateConcerns"
                placeholder="Immediate Concerns"
              />
              <InputField
                name="initialAssessment"
                placeholder="Initial Assessment"
              />
              <SelectField
                name="priorityLevel"
                placeholder="Priority Level"
                options={[
                  { label: "High", value: "High" },
                  { label: "Medium", value: "Medium" },
                  { label: "Low", value: "Low" },
                ]}
              />
              <InputField
                name="assignedTechnician"
                placeholder="Technician Assignment"
              />
              <InputField
                name="estimatedCompletionTime"
                placeholder="Estimated Completion Time"
              />
              <InputField
                name="requiredTools"
                placeholder="Required Tools/Parts"
              />
              <Field
                as={Input.TextArea}
                name="statusUpdates"
                placeholder="Status Updates"
                style={{ height: "80px", width: "100%" }}
                className="col-span-3 !border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
              />
              <InputField name="checkIn1" placeholder="Check-In 1" />
              <InputField name="checkIn2" placeholder="Check-In 2" />
              <InputField name="checkIn3" placeholder="Check-In 3" />
              <InputField
                name="repairActions"
                placeholder="Repair Actions Taken"
              />
              <InputField name="partsReplaced" placeholder="Parts Replaced" />
              <InputField name="finalStatus" placeholder="Final Status" />
              <Field
                as={Input.TextArea}
                name="summary"
                placeholder="Summary"
                style={{ height: "80px", width: "100%" }}
                className="col-span-3 !border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
              />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUnplannedWOPopup;
