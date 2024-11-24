import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { message, Modal, Radio } from "antd";
import { generateReport } from "app/services/reports"; // Assuming this is the API for report generation
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const UnplannedDetailsPopup = ({ visible, setVisible }) => {
  // Validation schema for the form
  const validationSchema = Yup.object({
    costCenter: Yup.string().required("Cost Center is required"),
    assetNumber: Yup.string().required("Asset Number is required"),
    createdFrom: Yup.date().required("Created Between From is required"),
    createdTo: Yup.date().required("Created Between To is required"),
    closedFrom: Yup.date().required("Closed Between From is required"),
    closedTo: Yup.date().required("Closed Between To is required"),
    assignedTo: Yup.string().required("Assigned To is required"),
    status: Yup.string().required("Status is required"),
    priority: Yup.string().required("Priority is required"),
    companyDoingWork: Yup.string().required("Company Doing Work is required"),
    formType: Yup.string()
      .oneOf(["pdf", "csv"], "Select a valid export format")
      .required("Export format is required"),
  });

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      // Placeholder for actual report generation function
      const { status, data } = await generateReport(
        values,
        "Unplanned Maintenance Details Report",
        "maintenance"
      );
      if (status === 200) {
        window.open(data.data);
        message.success(data.message || "Report generated successfully");
      } else {
        message.error(data.error || "Failed to generate report");
      }
    } catch (error) {
      message.error("Error generating report: " + error.message);
    }
    setSubmitting(false);
    setVisible(false); // Close the modal after submission
  };

  return (
    <div>
      <Formik
        initialValues={{
          costCenter: "",
          assetNumber: "",
          createdFrom: null,
          createdTo: null,
          closedFrom: null,
          closedTo: null,
          assignedTo: "",
          status: "",
          priority: "",
          companyDoingWork: "",
          formType: "pdf", // Default value for form type
        }}
        validationSchema={validationSchema} // Use Yup validation schema
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
              title="Generate Unplanned Maintenance Details Report"
            >
              <div>
                <div className="mt-4 grid md:grid-cols-2 gap-4 w-full items-end md:items-center">
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
                      name="closedFrom"
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
                    <SelectField
                      name="assignedTo"
                      placeholder="Person Doing Work"
                      options={[{ label: "John", value: "john" }]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="status"
                      placeholder="Status"
                      options={[{ label: "Open", value: "open" }]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="priority"
                      placeholder="Priority"
                      options={[{ label: "High", value: "high" }]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="companyDoingWork"
                      placeholder="Company Doing Work"
                      options={[{ label: "Company 1", value: "company1" }]}
                    />
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

export default UnplannedDetailsPopup;
