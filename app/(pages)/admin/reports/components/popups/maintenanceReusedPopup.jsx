import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Checkbox, InputNumber, message, Modal, Radio } from "antd";
import { generateReport } from "app/services/reports";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

// Initial values for the form
const initialValues = {
  costCenter: "",
  fromDate: null,
  toDate: null,
  criticallyFactor: "",
  craft: "",
  top: null,
  includeWO: false,
  formType: "pdf", // Default value for the form type
};

const MaintenanceReusedPopup = ({
  visible,
  setVisible,
  title,
  type,
  criticallyFactor,
  includeWO,
  craft,
  top,
}) => {
  // Dynamically create Yup validation schema inside the component
  const validationSchema = Yup.object({
    costCenter: Yup.string().required("Cost Center is required"),
    fromDate: Yup.date().required("From Date is required"),
    toDate: Yup.date().required("To Date is required"),
    formType: Yup.string()
      .oneOf(["pdf", "csv"], "Select a valid export format")
      .required("Export format is required"),

    // Conditionally validate based on props
    ...(criticallyFactor && {
      criticallyFactor: Yup.string().required("Critically Factor is required"),
    }),

    ...(craft && {
      craft: Yup.string().required("Craft is required"),
    }),

    ...(top && {
      top: Yup.number().required("Top is required"),
    }),

    includeWO: Yup.boolean(),
  });

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // Placeholder for actual report generation function
    const { status, data } = await generateReport(values, title, type);
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
        validationSchema={validationSchema} // Use the dynamically created schema here
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
              title={"Generate " + title}
            >
              <div>
                <div className="mt-4 grid md:grid-cols-2 gap-4 items-center">
                  <div className="w-full">
                    <InputField
                      name="costCenter"
                      placeholder="Cost Center"
                      maxLength={128}
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField name="fromDate" placeholder="From Date" />
                  </div>

                  <div className="w-full">
                    <DatePickerField name="toDate" placeholder="To Date" />
                  </div>

                  {/* Conditionally render fields based on props */}
                  {criticallyFactor && (
                    <div className="w-full">
                      <SelectField
                        name="criticallyFactor"
                        placeholder="Critically Factor"
                        options={[{ value: "factor-1", label: "Factor 1" }]}
                      />
                    </div>
                  )}

                  {craft && (
                    <div className="w-full">
                      <SelectField
                        name="craft"
                        placeholder="Craft"
                        options={[{ value: "craft-1", label: "Craft 1" }]}
                      />
                    </div>
                  )}

                  {top && (
                    <div className="w-full">
                      <Field
                        as={InputNumber}
                        name="top"
                        placeholder="Top"
                        style={{ height: "36px", width: "100%" }}
                      />
                    </div>
                  )}

                  {includeWO && (
                    <div className="w-full">
                      <Field as={Checkbox} name="includeWO">
                        Include WO Breakdown
                      </Field>
                    </div>
                  )}
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

export default MaintenanceReusedPopup;
