import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Checkbox, DatePicker, Modal, Radio, Select } from "antd";
import { Field, Form, Formik } from "formik";

const WOProcedurePopup = ({ visible, setVisible }) => {
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
