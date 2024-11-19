import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Checkbox, DatePicker, InputNumber, Modal, Radio, Select } from "antd";
import { Field, Form, Formik } from "formik";

const MaintenanceReusedPopup = ({
  visible,
  setVisible,
  title,
  criticallyFactor,
  includeWO,
  craft,
  top,
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
                    <DatePickerField name="fromDate" placeholder="From Date" />
                  </div>

                  {criticallyFactor && (
                    <div className="w-full">
                      <SelectField
                        name="criticallyFactor"
                        placeholder="Critically Factor"
                        options={[]}
                      />
                    </div>
                  )}
                  {craft && (
                    <div className="w-full">
                      <SelectField
                        name="craft"
                        placeholder="Craft"
                        options={[]}
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
