import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Modal, TimePicker } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { addUnplannedWorkOrder } from "app/services/workOrders";
import TimePickerField from "@/components/common/TimePickerField";
import { useSelector } from "react-redux";

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
  const { assets, isLoading, error } = useSelector((state) => state.assets);

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    console.log(values);
    const { status, data } = await addUnplannedWorkOrder(values);
    if (status === 200) {
      console.log(data);
      resetForm();
      setVisible(false);
      message.success(data?.message || "Work order added successfully");
    } else {
      message.error(data?.message || "Failed to add work order");
    }
    setSubmitting(false);
  };

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
      {({ isSubmitting, handleSubmit, submitForm, resetForm }) => (
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
                  onClick={() => {
                    resetForm();
                    setVisible(false);
                  }}
                  outlined
                  size="small"
                  text="Cancel"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
                <Button
                  className=""
                  htmlType="submit"
                  onClick={submitForm}
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
              <TimePickerField name="time" placeholder="Time" />
              <div className="md:col-span-3 -mb-4">
                <TextAreaField
                  name="problemDescription"
                  placeholder="Problem Description"
                  maxLength={150}
                />
              </div>
              <SelectField
                name="assetNum"
                placeholder="Asset #"
                options={assets?.map((asset) => ({
                  label: asset.assetNumber,
                  value: asset._id,
                }))}
              />
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
              <div className="col-span-3 -mb-4">
                <TextAreaField
                  name="statusUpdates"
                  placeholder="Status Updates"
                  maxLength={150}
                />
              </div>
              <InputField name="checkIn1" placeholder="Check-In 1" />
              <InputField name="checkIn2" placeholder="Check-In 2" />
              <InputField name="checkIn3" placeholder="Check-In 3" />
              <InputField
                name="repairActions"
                placeholder="Repair Actions Taken"
              />
              <InputField name="partsReplaced" placeholder="Parts Replaced" />
              <InputField name="finalStatus" placeholder="Final Status" />
              <div className="col-span-3 -mb-4">
                <TextAreaField
                  name="summary"
                  placeholder="Summary"
                  maxLength={150}
                />
              </div>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUnplannedWOPopup;
