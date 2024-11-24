import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Modal, Radio, message } from "antd";
import { generateReport } from "app/services/reports";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

// Yup validation schema for Maintenance Procedures
const validationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
  system: Yup.string().required("System is required"),
  tier3: Yup.string(),
  tier4: Yup.string(),
  formType: Yup.string()
    .oneOf(["pdf", "csv"], "Select a valid export format")
    .required("Export format is required"),
});

// Formik initial values for Maintenance Procedures
const initialValues = {
  category: "",
  system: "",
  tier3: "",
  tier4: "",
  formType: "pdf", // Default to pdf for radio button
};

const MaintenanceProceduresPopup = ({ visible, setVisible }) => {
  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    // Placeholder for actual report generation function
    const { status, data } = await generateReport(
      values,
      "Maintenance Procedures Report",
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
        initialValues={initialValues}
        validationSchema={validationSchema}
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
              title="Generate Maintenance Procedures Report"
            >
              <div>
                <div className="mt-4 grid md:grid-cols-2 gap-4 w-full items-end md:items-center">
                  <div className="w-full">
                    <SelectField
                      name="category"
                      placeholder="Category"
                      options={[
                        { value: "category-1", label: "Category 1" },
                        { value: "category-2", label: "Category 2" },
                        { value: "category-3", label: "Category 3" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="system"
                      placeholder="System"
                      options={[
                        { value: "air-system", label: "Air System" },
                        { value: "water-system", label: "Water System" },
                      ]}
                    />
                  </div>

                  {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="w-full">
                      <SelectField
                        name={`tier${index + 3}`}
                        placeholder={`Tier ${index + 3}`}
                        options={[
                          {
                            value: `tier-${index + 3}-1`,
                            label: `Tier ${index + 3} Option 1`,
                          },
                          {
                            value: `tier-${index + 3}-2`,
                            label: `Tier ${index + 3} Option 2`,
                          },
                        ]}
                      />
                    </div>
                  ))}
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

export default MaintenanceProceduresPopup;
