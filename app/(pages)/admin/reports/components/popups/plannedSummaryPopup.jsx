import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { message, Modal, Radio } from "antd";
import { generateReport } from "app/services/reports";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const PlannedSummaryPopup = ({
  visible,
  setVisible,
  title,
  categories,
  endPoint,
}) => {
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);
  const assets = useSelector((state) => state.assets.assets);

  // Validation schema for the form
  const validationSchema = Yup.object({
    // costCenter: Yup.string().required("Cost Center is required"),
    asset: Yup.string().required("Asset is required"),
    site: Yup.string().required("Site is required"),
    createdFrom: Yup.date().required("Created Between From is required"),
    createdTo: Yup.date().required("Created Between To is required"),
    closesdFrom: Yup.date().required("Closed Between From is required"),
    closedTo: Yup.date().required("Closed Between To is required"),
    category: Yup.string(),
    system: Yup.string(),
    // assignedTo: Yup.string().required("Assigned To is required"),
    // priority: Yup.string().required("Priority is required"),
    // companyDoingWork: Yup.string().required("Company Doing Work is required"),
    formType: Yup.string()
      .oneOf(["pdf", "csv"], "Select a valid export format")
      .required("Export format is required"),
  });

  // Form submission handler
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
          // costCenter: "",
          asset: "",
          site: "",
          createdFrom: null,
          createdTo: null,
          closesdFrom: null,
          closedTo: null,
          category: "",
          system: "",
          // assignedTo: "",
          // priority: "",
          // companyDoingWork: "",
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
              title={"Generate " + title}
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
                    <SelectField
                      name="site"
                      label="Site"
                      labelOnTop
                      placeholder="Select Site"
                      options={locations.map((i) => ({
                        label: i.site,
                        value: i._id,
                      }))}
                      required
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="createdFrom"
                      label="Created Between From"
                      labelOnTop
                      required
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="createdTo"
                      label="Created Between To"
                      labelOnTop
                      required
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="closesdFrom"
                      label="Closed Between From"
                      labelOnTop
                      required
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerField
                      name="closedTo"
                      label="Closed Between To"
                      labelOnTop
                      required
                    />
                  </div>
                  {categories && (
                    <>
                      <div className="w-full">
                        <SelectField
                          name="category"
                          label="Category"
                          labelOnTop
                          placeholder="Select Category"
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
                          label="System"
                          labelOnTop
                          placeholder="Select System"
                          options={systems?.map((i) => ({
                            label: i.system,
                            value: i._id,
                          }))}
                        />
                      </div>
                    </>
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

export default PlannedSummaryPopup;
