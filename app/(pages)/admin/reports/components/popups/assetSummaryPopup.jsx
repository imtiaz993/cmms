import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Checkbox, DatePicker, Modal, Radio, Select } from "antd";
import { Field, Form, Formik } from "formik";

const AssetSummaryPopup = ({ visible, setVisible }) => {
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
              title="Generate Asset Summary Report"
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
                      name="serialNumber"
                      placeholder="Serial Number"
                      maxLength={128}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="physicalLocation"
                      placeholder="Physical Location"
                      options={[
                        { value: "rig-21", label: "Rig 21" },
                        { value: "rig-22", label: "Rig 22" },
                        { value: "rig-23", label: "Rig 23" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="year"
                      placeholder="Year"
                      options={[
                        { value: "2021", label: "2021" },
                        { value: "2022", label: "2022" },
                        { value: "2023", label: "2023" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="accountingDept"
                      placeholder="Accounting Dept"
                      options={[
                        { value: "accounting-1", label: "Accounting 1" },
                        { value: "accounting-2", label: "Accounting 2" },
                        { value: "accounting-3", label: "Accounting 3" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <Field as={Checkbox} name="expandAssetClass">
                      Expand Asset Class
                    </Field>
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="category"
                      placeholder="Category"
                      options={[
                        { value: "category-1", label: "Category 1" },
                        { value: "category-2", label: "Category 2" },
                        { value: "category-3", label: "Category 3" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="system"
                      placeholder="System"
                      options={[{ value: "air-system", label: "Air System" }]}
                    />
                  </div>

                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-full">
                      <SelectField
                        name={`tier${index + 3}`}
                        placeholder={`Tier ${index + 3}`}
                      />
                    </div>
                  ))}

                  <div className="w-full">
                    <Field as={Checkbox} name="childAssets">
                      Include Child Assets
                    </Field>
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

export default AssetSummaryPopup;
