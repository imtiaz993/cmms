import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { rigs } from "@/constants/rigsAndSystems";
import { Checkbox, DatePicker, Modal, Radio, Select, message } from "antd";
import { generateReport } from "app/services/reports";
import { getCategories } from "app/services/setUp/categories";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

// Yup validation schema
const validationSchema = Yup.object({
  // costCenter: Yup.string().required("Cost Center is required"),
  asset: Yup.string().required("Asset is required"),
  site: Yup.string().required("Physical Location is required"),
  year: Yup.string().required("Year is required"),
  category: Yup.string().required("Category is required"),
  system: Yup.string(), //.required("System is required"),
  expandAssetClass: Yup.boolean(),
  childAssets: Yup.boolean(),
  formType: Yup.string()
    .oneOf(["pdf", "csv"], "Select a valid export format")
    .required("Export format is required"),
});

// Formik initial values
const initialValues = {
  // costCenter: "",
  asset: "",
  site: "",
  year: "",
  category: "",
  system: "",
  expandAssetClass: false,
  childAssets: false,
  formType: "pdf", // Default to pdf for radio button
};

const AssetSummaryPopup = ({
  visible,
  setVisible,
  categories,
  isInventory,
  endPoint,
}) => {
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);
  const assets = useSelector((state) => state.assets.assets);

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const { status, data } = await generateReport(values, endPoint);
    if (status === 200) {
      window.open(data.data);
      message.success(data.message || "Report generated successfully");
    } else {
      message.error(data.error || "Failed to generate report");
    }
    setSubmitting(false);
    setVisible(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, submitForm, errors }) => (
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
                    onClick={() => submitForm()}
                    size="small"
                    text="Generate"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
              title={
                isInventory
                  ? "Generate Inventory Summary Report"
                  : "Generate Asset Summary Report"
              }
            >
              <div>
                <div className="mt-4 grid md:grid-cols-2 gap-4 w-full items-end md:items-center">
                  {/* <div className="w-full">
                    <InputField
                      name="costCenter"
                      placeholder="Cost Center"
                      maxLength={128}
                    />
                  </div> */}
                  <div className="w-full">
                    <SelectField
                      name="asset"
                      placeholder="Select Asset"
                      label="Asset"
                      labelOnTop
                      required
                      options={assets.map((i) => ({
                        label: i.assetID,
                        value: i._id,
                      }))}
                      showSearch
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="site"
                      placeholder="Select Site"
                      label="Site"
                      labelOnTop
                      required
                      options={locations.map((i) => ({
                        label: i.site,
                        value: i._id,
                      }))}
                    />
                  </div>
                  <div className="w-full">
                    <SelectField
                      name="system"
                      placeholder="System"
                      options={systems?.map((i) => ({
                        label: i.system,
                        value: i._id,
                      }))}
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
                        { value: "2024", label: "2024" },
                        { value: "2025", label: "2025" },
                      ]}
                    />
                  </div>

                  <div className="w-full">
                    <SelectField
                      name="category"
                      placeholder="Category"
                      options={
                        categories &&
                        categories?.map((i) => ({
                          value: i._id,
                          label: i.category,
                        }))
                      }
                    />
                  </div>

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
