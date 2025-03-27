import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Checkbox, message, Modal, Radio } from "antd";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

// Example of a report generation function (replace with your actual logic)
import { generateReport } from "app/services/reports";
import { useSelector } from "react-redux";

const WOProcedurePopup = ({ visible, setVisible, categories, endPoint }) => {
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);
  const assets = useSelector((state) => state.assets.assets);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    site: Yup.string().required("Site is required"),
    asset: Yup.string().required("Asset is required"),
    createdFrom: Yup.date().required("Created Between From is required"),
    createdTo: Yup.date().required("Created Between To is required"),
    closesdFrom: Yup.date().required("Closed Between From is required"),
    closedTo: Yup.date().required("Closed Between To is required"),
    category: Yup.string().required("Category is required"),
    system: Yup.string().required("System is required"),
    // assignedTo: Yup.string().required("Person Doing Work is required"),
    // priority: Yup.string().required("Priority is required"),
    // formType: Yup.string()
    //   .oneOf(["pdf", "csv"], "Select a valid export format")
    //   .required("Export format is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // Example of generating a report, replace with actual API call
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
          asset: "",
          createdFrom: null,
          createdTo: null,
          closesdFrom: null,
          closedTo: null,
          category: "",
          system: "",
          formType: "pdf", // default export format
          // assignedTo: "",
          // status: "Open", // default value for status
          // priority: "High", // default value for priority
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
                      options={locations.map((i) => ({
                        label: i.site,
                        value: i._id,
                      }))}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="asset"
                      placeholder="Select Asset"
                      label="Asset"
                      labelOnTop
                      options={assets.map((i) => ({
                        label: i.assetID,
                        value: i._id,
                      }))}
                      required
                      showSearch
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
