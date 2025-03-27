import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { rigs } from "@/constants/rigsAndSystems";
import { Checkbox, message, Modal, Radio, Select } from "antd";
import { generateReport } from "app/services/reports";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const ReportsPopup = ({
  visible,
  setVisible,
  title,
  type,
  site = true,
  dataOnly,
  assetNumber,
  partNumber,
  fromToDate,
  includeChildAssets,
  date,
  year,
  endPoint,
}) => {
  const locations = useSelector((state) => state.location.location);
  const assets = useSelector((state) => state.assets.assets);
  const inventory = useSelector((state) => state.inventory.inventory);

  // Build the validation schema based on props
  const validationSchema = Yup.object({
    site: site ? Yup.string().required("Site is required") : Yup.string(),
    asset: assetNumber
      ? Yup.string().required("Asset is required")
      : Yup.string(),
    inventory: partNumber
      ? Yup.string().required("Part Number is required")
      : Yup.string(),
    date: date
      ? Yup.date().required("Date is required")
      : Yup.date().notRequired(),
    year: year ? Yup.string().required("Year is required") : Yup.string(),
    dataOnly: dataOnly ? Yup.boolean() : Yup.boolean(),

    // Only apply validation for `fromDate` and `toDate` if `fromToDate` prop is true
    fromDate: fromToDate
      ? Yup.date().required("From Date is required")
      : Yup.date().notRequired(),
    toDate: fromToDate
      ? Yup.date().required("To Date is required")
      : Yup.date().notRequired(),

    childAssets: includeChildAssets ? Yup.boolean() : Yup.boolean(),
    formType: Yup.string()
      .oneOf(["pdf", "csv"], "Select a valid export format")
      .required("Export format is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // Placeholder for actual report generation function
    const { status, data } = endPoint
      ? await generateReport(values, endPoint)
      : { status: null, data: null };
    if (status === 200) {
      window.open(data.data);
      message.success(data.message ?? "Report generated successfully");
      resetForm();
    } else {
      message.error(data?.message ?? "Failed to generate report");
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
          inventory: "",
          date: null,
          year: "",
          dataOnly: "",
          fromDate: null,
          toDate: null,
          childAssets: "",
          formType: "pdf", // Default value for form type
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, submitForm, errors, resetForm }) => (
          <Form>
            <Modal
              maskClosable={false}
              open={visible}
              onCancel={() => setVisible(false)}
              footer={
                <div>
                  <Button
                    className="mr-2"
                    onClick={() => {
                      setVisible(false);
                      resetForm();
                    }}
                    outlined
                    size="small"
                    text="Cancel"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                  <Button
                    onClick={() => {
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
                {site && (
                  <div className="mt-4 flex flex-col md:flex-row gap-4 w-full items-end md:items-center">
                    <div className="w-full">
                      <SelectField
                        name="site"
                        placeholder="Select Site"
                        label="Site"
                        labelOnTop
                        maxLength={128}
                        options={locations.map((i) => ({
                          label: i.site,
                          value: i._id,
                        }))}
                        required
                      />
                    </div>
                    {assetNumber && (
                      <div className="w-full">
                        <SelectField
                          name="asset"
                          placeholder="Select Asset"
                          label="Asset"
                          labelOnTop
                          options={
                            values.site &&
                            assets
                              .filter((i) => i.site._id === values.site)
                              ?.map((i) => ({
                                label: i.assetID,
                                value: i._id,
                              }))
                          }
                          required
                          showSearch
                        />
                      </div>
                    )}

                    {partNumber && (
                      <div className="w-full">
                        <SelectField
                          name="inventory"
                          placeholder="Select Part Number"
                          label="Part Number"
                          labelOnTop
                          options={
                            values.site
                              ? inventory
                                  .filter((i) => i.site._id === values.site)
                                  ?.map((i) => ({
                                    label: i.partNumber,
                                    value: i._id,
                                  }))
                              : []
                          }
                          required
                          showSearch
                        />
                      </div>
                    )}

                    {date && (
                      <div className="w-full">
                        <DatePickerField name="date" label="Date" required />
                      </div>
                    )}

                    {year && (
                      <div className="w-full">
                        <SelectField
                          name="year"
                          placeholder="Select Year"
                          label="Year"
                          labelOnTop
                          options={[
                            { value: "2025", label: "2025" },
                            { value: "2024", label: "2024" },
                            { value: "2023", label: "2023" },
                            { value: "2022", label: "2022" },
                            { value: "2021", label: "2021" },
                            { value: "2020", label: "2020" },
                          ]}
                          required
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

                {fromToDate && (
                  <div className="mt-4 flex flex-col md:flex-row gap-4 w-full">
                    <DatePickerField
                      name="fromDate"
                      label="From Date"
                      labelOnTop
                      required
                    />
                    <DatePickerField
                      name="toDate"
                      label="To Date"
                      labelOnTop
                      required
                    />
                  </div>
                )}

                <div className="mt-4 flex flex-col md:flex-row gap-4 w-full md:items-center">
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
