import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Checkbox, DatePicker, Modal, Radio, Select } from "antd";
import { Field, Form, Formik } from "formik";

const ReportsPopup = ({
  visible,
  setVisible,
  title,
  costCenter = true,
  parentAsset,
  dataOnly,
  assetNumber,
  fromToDate,
  includeChildAssets,
}) => {
  return (
    <div>
      <Formik
        initialValues={{
          costCenter: "",
          parentAsset: "",
          fromType: "",
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

                    {parentAsset && (
                      <div className="w-full">
                        <InputField
                          name="parentAsset"
                          placeholder="Parent Asset"
                          maxLength={128}
                        />
                      </div>
                    )}
                    {assetNumber && (
                      <div className="w-full">
                        <Field
                          as={Select}
                          name="assetNumber"
                          placeholder="Asset Number"
                          style={{
                            height: "36px",
                            width: "100%",
                          }}
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
                    <Field
                      as={DatePicker}
                      name="fromDate"
                      placeholder="From Date"
                      className="w-full"
                      style={{ height: "36px" }}
                    />
                    <Field
                      as={DatePicker}
                      name="fromDate"
                      placeholder="From Date"
                      className="w-full"
                      style={{ height: "36px" }}
                    />{" "}
                  </div>
                )}
                {includeChildAssets && (
                  <div className="mt-4">
                    <Field as={Checkbox} name="childAssets">
                      Include Child Assets
                    </Field>
                  </div>
                )}
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
