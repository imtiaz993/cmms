import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { rigs } from "@/constants/rigsAndSystems";
import { Checkbox, message, Modal, Radio } from "antd";
import { generateReport } from "app/services/reports";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const ReportsPopup = ({
  visible,
  setVisible,
  title,
  type,
  costCenter = true,
  dataOnly,
  assetNumber,
  fromToDate,
  includeChildAssets,
  physicalLocation,
  criticallyFactor,
  date,
  year,
}) => {
  // Build the validation schema based on props
  const validationSchema = Yup.object({
    costCenter: costCenter
      ? Yup.string().required("Cost Center is required")
      : Yup.string(),
    assetNumber: assetNumber
      ? Yup.string().required("Asset Number is required")
      : Yup.string(),
    date: date
      ? Yup.date().required("Date is required")
      : Yup.date().notRequired(),
    year: year ? Yup.string().required("Year is required") : Yup.string(),
    dataOnly: dataOnly ? Yup.boolean() : Yup.boolean(),
    physicalLocation: physicalLocation
      ? Yup.string().required("Physical Location is required")
      : Yup.string(),

    // Only apply validation for `fromDate` and `toDate` if `fromToDate` prop is true
    fromDate: fromToDate
      ? Yup.date().required("From Date is required")
      : Yup.date().notRequired(),
    toDate: fromToDate
      ? Yup.date().required("To Date is required")
      : Yup.date().notRequired(),

    criticallyFactor: criticallyFactor
      ? Yup.string().required("Critically Factor is required")
      : Yup.string(),
    childAssets: includeChildAssets ? Yup.boolean() : Yup.boolean(),
    formType: Yup.string()
      .oneOf(["pdf", "csv"], "Select a valid export format")
      .required("Export format is required"),
  });

  // Handle form submission
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
        initialValues={{
          costCenter: "",
          assetNumber: "",
          physicalLocation: "",
          date: null,
          year: "",
          dataOnly: false,
          fromDate: null,
          toDate: null,
          criticallyFactor: "",
          childAssets: false,
          formType: "pdf", // Default value for form type
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, submitForm, errors }) => (
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
                    onClick={() => {
                      console.log("errors: ", errors);
                      submitForm();
                    }}
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
                {costCenter && (
                  <div className="mt-4 flex flex-col md:flex-row gap-4 w-full items-end md:items-center">
                    <div className="w-full">
                      <InputField
                        name="costCenter"
                        placeholder="Cost Center"
                        maxLength={128}
                      />
                    </div>

                    {assetNumber && (
                      <div className="w-full">
                        <SelectField
                          name="assetNumber"
                          placeholder="Asset Number"
                          options={[]}
                        />
                      </div>
                    )}

                    {date && (
                      <div className="w-full">
                        <DatePickerField name="date" placeholder="Date" />
                      </div>
                    )}

                    {year && (
                      <div className="w-full">
                        <SelectField
                          name="year"
                          placeholder="Year"
                          options={[
                            { value: "2024", label: "2024" },
                            { value: "2023", label: "2023" },
                            { value: "2022", label: "2022" },
                            { value: "2021", label: "2021" },
                            { value: "2020", label: "2020" },
                          ]}
                        />
                      </div>
                    )}

                    {dataOnly && (
                      <div className="md:w-1/3">
                        <Field as={Checkbox} name="dataOnly">
                          Data Only
                        </Field>
                      </div>
                    )}
                  </div>
                )}

                {physicalLocation && (
                  <div className="mt-4 w-full">
                    <SelectField
                      name="physicalLocation"
                      placeholder="Physical Location"
                      options={rigs.map((i) => ({
                        label: i.name,
                        value: i.id,
                      }))}
                    />
                  </div>
                )}

                {fromToDate && (
                  <div className="mt-4 flex flex-col md:flex-row gap-4 w-full">
                    <DatePickerField name="fromDate" placeholder="From Date" />
                    <DatePickerField name="toDate" placeholder="To Date" />
                  </div>
                )}

                <div className="mt-4 flex flex-col md:flex-row gap-4 w-full md:items-center">
                  {criticallyFactor && (
                    <div className="w-full">
                      <SelectField
                        name="criticallyFactor"
                        placeholder="Critically Factor"
                        options={[]}
                      />
                    </div>
                  )}
                  {includeChildAssets && (
                    <div className="w-full">
                      <Field as={Checkbox} name="childAssets">
                        Include Child Assets
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

export default ReportsPopup;
