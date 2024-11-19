import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Field, Form, Formik } from "formik";
import SelectField from "@/components/common/SelectField"; // Import SelectField
import DatePickerField from "@/components/common/DatePickerField"; // Import DatePickerField
import { Modal, Radio } from "antd";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  costCenter: Yup.string().required("Cost Center is required"),
  assetNumber: Yup.string().required("Asset Number is required"),
  createdFrom: Yup.date().required("Created From is required"),
  createdTo: Yup.date().required("Created To is required"),
  closesdFrom: Yup.date().required("Closed From is required"),
  closedTo: Yup.date().required("Closed To is required"),
  assignedTo: Yup.string().required("Person Doing Work is required"),
  category: Yup.string().required("Category is required"),
  system: Yup.string().required("System is required"),
  tier3: Yup.string().required("Tier 3 is required"),
  tier4: Yup.string().required("Tier 4 is required"),
  tier5: Yup.string().required("Tier 5 is required"),
  tier6: Yup.string().required("Tier 6 is required"),
  type: Yup.string().required("Type is required"),
  status: Yup.string().required("Status is required"),
  craft: Yup.string().required("Craft is required"),
  priority: Yup.string().required("Priority is required"),
  cause: Yup.string().required("Cause is required"),
});

const WOSummaryPopup = ({ visible, setVisible }) => {
  return (
    <div>
      <Formik
        initialValues={{
          costCenter: "",
          createdFrom: "",
          createdTo: "",
          closesdFrom: "",
          closedTo: "",
          assignedTo: "",
          category: "",
          system: "",
          tier3: "",
          tier4: "",
          tier5: "",
          tier6: "",
          type: "",
          status: "",
          craft: "",
          priority: "",
          cause: "",
          formType: "pdf", // Default form type as pdf
        }}
        validationSchema={validationSchema}
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
              title="Generate Work Order Summary Report"
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

                  {/* Replace Field with custom DatePickerField */}
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

                  {/* Replace Field with custom SelectField */}
                  <div className="w-full">
                    <SelectField
                      name="assignedTo"
                      placeholder="Person Doing Work"
                      options={[
                        { value: "user1", label: "User 1" },
                        { value: "user2", label: "User 2" },
                      ]} // Replace with actual options
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="category"
                      placeholder="Category"
                      options={[
                        { value: "cat1", label: "Category 1" },
                        { value: "cat2", label: "Category 2" },
                      ]} // Replace with actual options
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="system"
                      placeholder="System"
                      options={[
                        { value: "sys1", label: "System 1" },
                        { value: "sys2", label: "System 2" },
                      ]} // Replace with actual options
                    />
                  </div>

                  {/* Render dynamic SelectFields */}
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-full">
                      <SelectField
                        name={`tier${index + 3}`}
                        placeholder={`Tier ${index + 3}`}
                        options={[
                          {
                            value: `tier${index + 3}`,
                            label: `Tier ${index + 3}`,
                          },
                        ]} // Replace with actual options
                      />
                    </div>
                  ))}

                  <div className="w-full">
                    <SelectField
                      name="type"
                      placeholder="Type"
                      options={[
                        { value: "type1", label: "Type 1" },
                        { value: "type2", label: "Type 2" },
                      ]} // Replace with actual options
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="status"
                      placeholder="Status"
                      options={[
                        { value: "open", label: "Open" },
                        { value: "closed", label: "Closed" },
                      ]} // Replace with actual options
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="craft"
                      placeholder="Craft"
                      options={[
                        { value: "craft1", label: "Craft 1" },
                        { value: "craft2", label: "Craft 2" },
                      ]} // Replace with actual options
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="priority"
                      placeholder="Priority"
                      options={[
                        { value: "high", label: "High" },
                        { value: "low", label: "Low" },
                      ]} // Replace with actual options
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="cause"
                      placeholder="Cause"
                      options={[
                        { value: "cause1", label: "Cause 1" },
                        { value: "cause2", label: "Cause 2" },
                      ]} // Replace with actual options
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

export default WOSummaryPopup;
