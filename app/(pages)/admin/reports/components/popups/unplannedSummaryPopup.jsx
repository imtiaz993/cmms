import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Checkbox, DatePicker, Modal, Radio, Select } from "antd";
import { Field, Form, Formik } from "formik";

const UnplannedSummaryPopup = ({ visible, setVisible }) => {
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
              title="Generate Unplanned Maintenance Summary Report"
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

                  <div className="w-full md:col-span-2">
                    <SelectField
                      name="physicalLocation"
                      placeholder="Physical Location"
                      options={[
                        { value: "rig-21", label: "Rig 21" },
                        { value: "rig-22", label: "Rig 22" },
                        { value: "rig-23", label: "Rig 23" },
                        { value: "rig-24", label: "Rig 24" },
                        { value: "rig-25", label: "Rig 25" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={DatePicker}
                      name="createdFrom"
                      placeholder="Created Between From"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={DatePicker}
                      name="createdTo"
                      placeholder="Created Between To"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={DatePicker}
                      name="closesdFrom"
                      placeholder="Closed Between From"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={DatePicker}
                      name="closedTo"
                      placeholder="Closed Between To"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="assignedTo"
                      placeholder="Person Doing Work"
                      options={[
                        { value: "john", label: "John" },
                        { value: "jane", label: "Jane" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="problem"
                      placeholder="Problem"
                      options={[]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="status"
                      placeholder="Status"
                      options={[{ value: "open", label: "Open" }]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="cause"
                      placeholder="Cause"
                      options={[]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="priority"
                      placeholder="Priority"
                      options={[{ value: "high", label: "High" }]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="companyDoingWork"
                      placeholder="company Doing Work"
                      options={[{ value: "company", label: "Company 1" }]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="criticality"
                      placeholder="Criticality"
                      options={[]}
                    />
                  </div>
                  <div className="w-full">
                    <p className="">Has Downtime</p>
                    <div role="group">
                      <label className="mr-4">
                        <Field
                          as={Radio}
                          type="radio"
                          name="hasDowntime"
                          value="yes"
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="mr-4">
                        <Field
                          as={Radio}
                          type="radio"
                          name="hasDowntime"
                          value="no"
                          className="mr-2"
                        />
                        No
                      </label>
                      <label>
                        <Field
                          as={Radio}
                          type="radio"
                          name="hasDowntime"
                          value="Both"
                          className="mr-2"
                        />
                        Both
                      </label>
                    </div>
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

export default UnplannedSummaryPopup;
