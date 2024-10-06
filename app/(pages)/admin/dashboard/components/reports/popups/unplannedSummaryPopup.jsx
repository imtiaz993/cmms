import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
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

                  <div className="w-full col-span-2">
                    <Field
                      as={Select}
                      name="physicalLocation"
                      placeholder="Physical Location"
                      style={{ height: "36px", width: "100%" }}
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
                    <Field
                      as={Select}
                      name="assignedTo"
                      placeholder="Person Doing Work"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="problem"
                      placeholder="Problem"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="status"
                      placeholder="Status"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="cause"
                      placeholder="Cause"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="priority"
                      placeholder="Priority"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="companyDoingWork"
                      placeholder="company Doing Work"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="criticality"
                      placeholder="Criticality"
                      style={{ height: "36px", width: "100%" }}
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
