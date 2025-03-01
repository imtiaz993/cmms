import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Select, message } from "antd";
import { login } from "app/services/auth";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  assetNumber: Yup.string(),
});

const AssetFilter = ({ closeDropdown }) => {
  const [isClearing, setIsClearing] = useState(false);
  const handleSubmit = async (values, setSubmitting) => {
    console.log(values);
    console.log(values);
    !setSubmitting && setIsClearing(true);
    const status = 200;
    const data = null;
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Assets fetched successfully");
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch assets");
    }
  };

  return (
    <div
      className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto"
      style={{
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Formik
        initialValues={{
          assetNumber: "",
          assetDescription: "",
          altId: "",
          serialNumber: "",
          barcode: "",
          oemSerialNumber: "",
          physicalLocation: "",
          accountingDept: "",
          status: "",
          category: "",
          system: "",
          tier3: "",
          tier4: "",
          tier5: "",
          tier6: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField name="assetNumber" placeholder="Asset #" />
              <InputField
                name="assetDescription"
                placeholder="Asset Description"
              />
              <InputField name="altId" placeholder="Alt ID #" />
              <InputField name="serialNumber" placeholder="Serial #" />
              <InputField name="barcode" placeholder="Barcode" />
              <InputField name="oemSerialNumber" placeholder="OEM Serial #" />
              <SelectField
                name="physicalLocation"
                placeholder="Physical Location"
              />
              <SelectField
                name="accountingDept"
                placeholder="Accounting Dept."
              />
              <SelectField name="status" placeholder="Status" />
              <SelectField name="category" placeholder="Category" />
              <SelectField name="system" placeholder="System" />
              <SelectField name="tier3" placeholder="Tier 3" />
              <SelectField name="tier4" placeholder="Tier 4" />
              <SelectField name="tier5" placeholder="Tier 5" />
              <SelectField name="tier6" placeholder="Tier 6" />
              <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-4">
                <div>
                  <Button
                    outlined
                    size="small"
                    text="Clear Filter"
                    disabled={isSubmitting || isClearing}
                    isLoading={isClearing}
                    onClick={() => {
                      resetForm();
                      handleSubmit({});
                    }}
                    style={{ width: "fit-content" }}
                    className="mr-2"
                  />
                  <Button
                    size="small"
                    text="Filter"
                    htmlType="submit"
                    disabled={isSubmitting || isClearing}
                    isLoading={isSubmitting}
                    style={{ width: "fit-content" }}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssetFilter;
