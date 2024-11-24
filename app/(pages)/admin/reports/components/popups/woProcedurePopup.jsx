import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Checkbox, message, Modal, Radio } from "antd";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

// Example of a report generation function (replace with your actual logic)
import { generateReport } from "app/services/reports";

const WOProcedurePopup = ({ visible, setVisible }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    costCenter: Yup.string().required("Cost Center is required"),
    assetNumber: Yup.string().required("Asset Number is required"),
    createdFrom: Yup.date().required("Created Between From is required"),
    createdTo: Yup.date().required("Created Between To is required"),
    closesdFrom: Yup.date().required("Closed Between From is required"),
    closedTo: Yup.date().required("Closed Between To is required"),
    assignedTo: Yup.string().required("Person Doing Work is required"),
    category: Yup.string().required("Category is required"),
    system: Yup.string().required("System is required"),
    tier3: Yup.string().required("Tier 3 is required"),
    tier4: Yup.string().required("Tier 4 is required"),
    tier5: Yup.string().required("Tier 5 is required"),
    tier6: Yup.string().required("Tier 6 is required"),
    status: Yup.string().required("Status is required"),
    craft: Yup.string().required("Craft is required"),
    priority: Yup.string().required("Priority is required"),
    formType: Yup.string()
      .oneOf(["pdf", "csv"], "Select a valid export format")
      .required("Export format is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // Example of generating a report, replace with actual API call
    const { status, data } = await generateReport(
      values,
      "Work Order Procedure Report",
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
          createdFrom: null,
          createdTo: null,
          closesdFrom: null,
          closedTo: null,
          assignedTo: "",
          category: "",
          system: "",
          tier3: "",
          tier4: "",
          tier5: "",
          tier6: "",
          status: "Open", // default value for status
          craft: "",
          priority: "High", // default value for priority
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
              title="Generate Work Order Procedure Report"
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
                      placeholder="Person Doing Work"
                      options={[{ value: "John Doe", label: "John Doe" }]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="category"
                      placeholder="Category"
                      options={[]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="system"
                      placeholder="System"
                      options={[]}
                    />
                  </div>

                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-full">
                      <SelectField
                        name={`tier${index + 3}`}
                        placeholder={`Tier ${index + 3}`}
                        options={[]}
                      />
                    </div>
                  ))}

                  <div className="w-full">
                    <SelectField
                      name="status"
                      placeholder="Status"
                      options={[{ value: "Open", label: "Open" }]}
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
                      options={[{ value: "High", label: "High" }]}
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

export default WOProcedurePopup;
