import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Field, Form, Formik } from "formik";
import SelectField from "@/components/common/SelectField"; // Import SelectField
import DatePickerField from "@/components/common/DatePickerField"; // Import DatePickerField
import { message, Modal, Radio } from "antd";
import * as Yup from "yup";
import { generateReport } from "app/services/reports";
import { useSelector } from "react-redux";

// Validation Schema
const validationSchema = Yup.object().shape({
  site: Yup.string().required("Site is required"),
  assetNumber: Yup.string().required("Asset Number is required"),
  createdFrom: Yup.date().required("Created From is required"),
  createdTo: Yup.date().required("Created To is required"),
  closesdFrom: Yup.date().required("Closed From is required"),
  closedTo: Yup.date().required("Closed To is required"),
  category: Yup.string().required("Category is required"),
  system: Yup.string().required("System is required"),
  // assignedTo: Yup.string().required("Person Doing Work is required"),
  // type: Yup.string().required("Type is required"),
  // status: Yup.string().required("Status is required"),
  // craft: Yup.string().required("Craft is required"),
  // priority: Yup.string().required("Priority is required"),
  // cause: Yup.string().required("Cause is required"),
});

const WOSummaryPopup = ({ visible, setVisible, categories, endPoint }) => {
  // not using this file for wosummary***********************************************************************************
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // Placeholder for actual report generation function
    const { status, data } = await generateReport(values, endPoint);
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
          site: "",
          assetNumber: "",
          createdFrom: "",
          createdTo: "",
          closesdFrom: "",
          closedTo: "",
          category: "",
          system: "",
          formType: "pdf", // Default form type as pdf
          // assignedTo: "",
          // type: "",
          // status: "",
          // craft: "",
          // priority: "",
          // cause: "",
        }}
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
                    onClick={submitForm}
                    size="small"
                    text="Generate"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
              title="Generate Work Order Summary Report"
            >
              <div>
                <div className="mt-4 grid md:grid-cols-2 gap-4 w-full items-end md:items-center">
                  {/* <div className="w-full">
                    <InputField
                      name="costCenter"
                      placeholder="Cost Center"
                      maxLength={128}
                    />
                  </div> */}
                  <div className="w-full">
                    <SelectField
                      name="site"
                      placeholder="Site"
                      options={
                        locations &&
                        locations?.map((i) => ({
                          label: i.site,
                          value: i._id,
                        }))
                      }
                    />
                  </div>

                  <div className="w-full">
                    <InputField
                      name="assetNumber"
                      placeholder="Asset Number"
                      maxLength={128}
                    />
                  </div>

                  {/* Date Pickers */}
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
                      name="category"
                      placeholder="Category"
                      options={
                        categories &&
                        categories?.map((i) => ({
                          value: i._id,
                          label: i.category,
                        }))
                      }
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="system"
                      placeholder="System"
                      options={systems?.map((i) => ({
                        label: i.system,
                        value: i._id,
                      }))}
                    />
                  </div>
                </div>

                {/* Export Format */}
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

export default WOSummaryPopup;
