import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Checkbox, message, Modal, Radio } from "antd";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

// Example of a report generation function (replace with your actual logic)
import { generateReport } from "app/services/reports";

const WOPersonnelSummaryPopup = ({ visible, setVisible }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    costCenter: Yup.string().required("Cost Center is required"),
    createdFrom: Yup.date().required("Created Between From is required"),
    createdTo: Yup.date().required("Created Between To is required"),
    closesdFrom: Yup.date().required("Closed Between From is required"),
    closedTo: Yup.date().required("Closed Between To is required"),
    createdFromMainHrs: Yup.date().required(
      "Main Hours Created Between From is required"
    ),
    createdToMainHrs: Yup.date().required(
      "Main Hours Created Between To is required"
    ),
    assignedTo: Yup.string().required("Assigned To is required"),
    status: Yup.string().required("Status is required"),
    priority: Yup.string().required("Priority is required"),
    formType: Yup.string()
      .oneOf(["pdf", "csv"], "Select a valid export format")
      .required("Export format is required"),
    includeWO: Yup.bool(),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // Example of generating a report, replace with actual API call
    const { status, data } = await generateReport(
      values,
      "Work Order Personnel Summary Report",
      "maintenance"
    );
    if (status === 200) {
      window.open(data.data);
      message.success(data.message || "Report generated successfully");
    } else {
      message.error(data.error || "Failed to generate report");
    }
    setSubmitting(false);
    setVisible(false);
  };

  return (
    <div>
      <Formik
        initialValues={{
          costCenter: "",
          createdFrom: null,
          createdTo: null,
          closesdFrom: null,
          closedTo: null,
          createdFromMainHrs: null,
          createdToMainHrs: null,
          assignedTo: "",
          status: "open", // default value for status
          craft: "",
          priority: "high", // default value for priority
          includeWO: false,
          formType: "pdf", // default export format
        }}
        validationSchema={validationSchema} // Use validation schema
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, submitForm }) => (
          <Form>
            <Modal
              maskClosable={false}
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
                    onClick={() => submitForm()}
                    size="small"
                    text="Generate"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
              title="Generate Work Order Personnel Summary Report"
            >
              <div>
                <div className="mt-4 grid md:grid-cols-2 gap-4 w-full items-end md:items-center">
                  <div className="w-full md:col-span-2">
                    <InputField
                      name="costCenter"
                      placeholder="Cost Center"
                      maxLength={128}
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="createdFrom"
                      placeholder="Created Between From"
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="createdTo"
                      placeholder="Created Between To"
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="closesdFrom"
                      placeholder="Closed Between From"
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="closedTo"
                      placeholder="Closed Between To"
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="createdFromMainHrs"
                      placeholder="Main Hours Created Between From"
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="createdToMainHrs"
                      placeholder="Main Hours Created Between To"
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="assignedTo"
                      placeholder="Assigned To"
                      options={[
                        { value: "john", label: "John" },
                        { value: "jane", label: "Jane" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="status"
                      placeholder="Status"
                      options={[
                        { value: "open", label: "Open" },
                        { value: "closed", label: "Closed" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="craft"
                      placeholder="Craft"
                      options={[]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="priority"
                      placeholder="Priority"
                      options={[{ value: "high", label: "High" }]}
                    />
                  </div>

                  <div className="w-full">
                    <Field as={Checkbox} name="includeWO">
                      Include WO Breakdown
                    </Field>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-secondary mb-1">Export As</p>
                  <div role="group">
                    <label className="mr-4">
                      <Field
                        as={Radio}
                        type="radio"
                        name="formType"
                        value="pdf"
                        className="mr-2"
                      />
                      PDF
                    </label>
                    <label>
                      <Field
                        as={Radio}
                        type="radio"
                        name="formType"
                        value="csv"
                        className="mr-2"
                      />
                      CSV
                    </label>
                  </div>
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WOPersonnelSummaryPopup;
