import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { message, Modal, Radio } from "antd";
import { generateReport } from "app/services/reports";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const PlannedSummaryPopup = ({ visible, setVisible }) => {
  // Validation schema for the form
  const validationSchema = Yup.object({
    costCenter: Yup.string().required("Cost Center is required"),
    assetNumber: Yup.string().required("Asset Number is required"),
    physicalLocation: Yup.string().required("Physical Location is required"),
    createdFrom: Yup.date().required("Created Between From is required"),
    createdTo: Yup.date().required("Created Between To is required"),
    closesdFrom: Yup.date().required("Closed Between From is required"),
    closedTo: Yup.date().required("Closed Between To is required"),
    assignedTo: Yup.string().required("Assigned To is required"),
    priority: Yup.string().required("Priority is required"),
    companyDoingWork: Yup.string().required("Company Doing Work is required"),
    formType: Yup.string()
      .oneOf(["pdf", "csv"], "Select a valid export format")
      .required("Export format is required"),
  });

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // Placeholder for actual report generation function
    const { status, data } = await generateReport(
      values,
      "Planned Maintenance Summary Report",
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
          assetNumber: "",
          physicalLocation: "",
          createdFrom: null,
          createdTo: null,
          closesdFrom: null,
          closedTo: null,
          assignedTo: "",
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
              title="Generate Planned Maintenance Summary Report"
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

                  <div className="w-full md:col-span-2">
                    <SelectField
                      name="physicalLocation"
                      placeholder="Physical Location"
                      options={[
                        {
                          value: "Rig Hpu",
                          label: "Rig Hpu",
                        },
                      ]}
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
                    <SelectField
                      name="assignedTo"
                      placeholder="Assigned To"
                      options={[{ value: "manager", label: "Manager" }]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="priority"
                      placeholder="Priority"
                      options={[
                        {
                          value: "High",
                          label: "High",
                        },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="companyDoingWork"
                      placeholder="Company Doing Work"
                      options={[
                        {
                          value: "Company 1",
                          label: "Company 1",
                        },
                      ]}
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

export default PlannedSummaryPopup;
