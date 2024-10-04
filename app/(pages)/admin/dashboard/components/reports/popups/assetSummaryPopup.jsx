import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Checkbox, DatePicker, Modal, Radio, Select } from "antd";
import { Field, Form, Formik } from "formik";

const AssetSummaryPopup = (visible, setVisible) => {
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
                    <Field
                      as={Select}
                      name="physicalLocation"
                      placeholder="Physical Location"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="year"
                      placeholder="Year"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="accountingDept"
                      placeholder="Accounting Dept"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field as={Checkbox} name="expandAssetClass">
                      Expand Asset Class
                    </Field>
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="category"
                      placeholder="Category"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      as={Select}
                      name="system"
                      placeholder="System"
                      className="w-full"
                      style={{ height: "36px", width: "100%" }}
                    />
                  </div>

                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="w-full">
                      <Field
                        as={Select}
                        name={`tier${index + 1}`}
                        placeholder={`Tier ${index + 1}`}
                        className="w-full"
                        style={{ height: "36px", width: "100%" }}
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
