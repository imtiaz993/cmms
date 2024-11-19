import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Checkbox, DatePicker, Modal, Radio, Select } from "antd";
import { Field, Form, Formik } from "formik";

const ReportsPopup = ({
  visible,
  setVisible,
  title,
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
  return (
    <div>
      <Formik
        initialValues={{
          costCenter: "",
        }}
      >
        {({ values, isSubmitting }) => (
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
                    className=""
                    onClick={() => setVisible(false)}
                    size="small"
                    text="Generate"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
              // bodyStyle={{ height: "200px", overflowY: "auto", overflowX: "hidden" }} // Adjusted height
              title={title}
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
                      options={[{ value: "rig-21", label: "Rig 21" }]}
                    />
                  </div>
                )}
                {fromToDate && (
                  <div className="mt-4 flex flex-col md:flex-row gap-4 w-full">
                    <DatePickerField name="fromDate" placeholder="From Date" />
                    <DatePickerField name="fromDate" placeholder="From Date" />
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
