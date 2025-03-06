import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import TimePickerField from "@/components/common/TimePickerField";
import { message, Modal } from "antd";
import { addManHours } from "app/services/workOrders";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// Validation Schema using Yup
const validationSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  manHours: Yup.number().when("type", {
    is: (value) => value === "manHours",
    then: (schema) =>
      schema
        .required("Man Hours is required")
        .positive("Must be a positive number"),
    otherwise: (schema) => schema.nullable(),
  }),
  clockIn: Yup.date().when("type", {
    is: (value) => value === "clockInClockOut",
    then: (schema) => schema.required("Clock In is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  clockOut: Yup.date().when("type", {
    is: (value) => value === "clockInClockOut",
    then: (schema) => schema.required("Clock Out is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  performedBy: Yup.string().required("Performed By is required"),
  companyDoingWork: Yup.string().required("Company Doing Work is required"),
  rate: Yup.string().required("Rate is required"),
  comment: Yup.string().max(150, "Comment cannot exceed 150 characters"),
});

const AddManHoursPopup = ({ visible, setVisible, setWorkOrder, slug }) => {
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    console.log(values);
    if (
      values.clockIn &&
      values.clockOut &&
      values.clockInTime &&
      values.clockOutTime
    ) {
      // Combine the date and time strings
      const clockInDateTime = `${values.clockIn}T${values.clockInTime}:00`; // Format: "YYYY-MM-DDTHH:mm:ss"
      const clockOutDateTime = `${values.clockOut}T${values.clockOutTime}:00`; // Format: "YYYY-MM-DDTHH:mm:ss"

      // Convert the combined strings to Date objects
      const clockInDate = new Date(clockInDateTime);
      const clockOutDate = new Date(clockOutDateTime);

      // Check if both clockInDate and clockOutDate are valid dates
      if (!isNaN(clockInDate) && !isNaN(clockOutDate)) {
        // Calculate the difference in milliseconds
        values.manHours =
          (clockOutDate.getTime() - clockInDate.getTime()) / (1000 * 60 * 60); // Convert ms to hours
        console.log(values.manHours); // Outputs the calculated man hours
      } else {
        console.error("Invalid clockIn or clockOut date/time");
      }
    }

    const { status, data } = await addManHours({
      ...values,
      workOrder: slug,
    });
    if (status === 200) {
      console.log(data);
      setWorkOrder((prev) => ({
        ...prev,
        manHours: [...prev.manHours, data?.data],
      }));
      message.success(data?.message || "Work order added successfully");
    } else {
      message.error(data?.message || "Failed to add work order");
    }
    setSubmitting(false);
    resetForm();
    setVisible(false);
  };
  return (
    <div>
      <Formik
        initialValues={{
          type: "manHours",
          manHours: "",
          clockIn: "",
          clockOut: "",
          clockInTime: "",
          clockOutTime: "",
          performedBy: "",
          companyDoingWork: "",
          rate: "",
          comment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ values, isSubmitting, handleSubmit, submitForm, errors }) => (
          <Form onSubmit={handleSubmit}>
            {console.log("error: ", errors)}
            <Modal
              maskClosable={false}
              title="Add Man Hours"
              open={visible}
              onCancel={() => setVisible(false)}
              footer={
                <div className="mt-7">
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
                    htmlType="submit"
                    onClick={submitForm}
                    size="small"
                    text="Add"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
              width={800}
            >
              <div className="grid md:grid-cols-3 gap-4">
                {/* Type Field using Formik Field */}
                <SelectField
                  name="type"
                  placeholder="Type"
                  options={[
                    { value: "manHours", label: "Man Hours" },
                    { value: "clockInClockOut", label: "Clock In/Clock Out" },
                  ]}
                />

                {/* Conditionally Rendered Fields */}
                {values.type === "manHours" && (
                  <InputField
                    name="manHours"
                    placeholder="Man Hours"
                    className="w-full"
                  />
                )}

                {values.type === "clockInClockOut" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4 md:col-span-2">
                      <DatePickerField name="clockIn" placeholder="Clock In" />
                      <TimePickerField name="clockInTime" placeholder="Time" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:col-span-2">
                      <DatePickerField
                        name="clockOut"
                        placeholder="Clock Out"
                      />
                      <TimePickerField name="clockOutTime" placeholder="Time" />
                    </div>
                  </>
                )}

                <InputField name="performedBy" placeholder="Performed By" />
                <InputField
                  name="companyDoingWork"
                  placeholder="Company Doing Work"
                />

                {/* Rate Dropdown */}
                <SelectField
                  name="rate"
                  placeholder="Rate"
                  className="w-full"
                  options={[
                    { label: "Normal", value: "normal" },
                    { label: "Double", value: "double" },
                    { label: "Overtime", value: "overtime" },
                  ]}
                />
                <div className="col-span-3 -mb-4">
                  <TextAreaField
                    name="comment"
                    placeholder="Add Comment"
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

export default AddManHoursPopup;
