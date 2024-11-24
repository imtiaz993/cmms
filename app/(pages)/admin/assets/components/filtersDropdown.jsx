import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Select, message } from "antd";
import { login } from "app/services/auth";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import { getFilteredAssets } from "app/services/assets";
import { rigs, systems } from "@/constants/rigsAndSystems";
import TextAreaField from "@/components/common/TextAreaField";
import DatePickerField from "@/components/common/DatePickerField";

const validationSchema = Yup.object().shape({
  assetNumber: Yup.string(),
});

const AssetFilter = ({ setAssets }) => {
  const submit = async (values, setSubmitting, resetForm) => {
    console.log(values);
    const { status, data } = await getFilteredAssets(values);
    setSubmitting(false);
    if (status === 200) {
      message.success(data?.message || "Assets fetched successfully");
      setAssets(data?.data);
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
          physicalLocation: "",
          mainSystem: "",
          serialNumber: "",
          assetNumber: "",
          make: "",
          model: "",
          part: "",
          criticality: "",
          maintStatus: "",
          installedDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm, values, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <SelectField
                name="physicalLocation"
                placeholder="Physical Location (Rig)"
                options={rigs
                  .slice(0, rigs.length - 2)
                  .map((i) => ({ label: i.name, value: i.id }))}
              />

              <SelectField
                name="mainSystem"
                placeholder="Main System"
                options={systems.map((i) => ({
                  label: i.name,
                  value: i.id,
                }))}
              />
              <InputField name="serialNumber" placeholder="Serial #" />
              <InputField name="assetNumber" placeholder="Asset #" />
              <InputField name="make" placeholder="Make" />
              <InputField name="model" placeholder="Model" />
              <InputField name="part" placeholder="Part #" />
              <SelectField
                name="criticality"
                placeholder="Criticality"
                options={[
                  { value: "high", label: "High" },
                  { value: "medium", label: "Medium" },
                  { value: "low", label: "Low" },
                ]}
              />
              <SelectField
                name="maintStatus"
                placeholder="Maint. Status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
              <DatePickerField
                name="installedDate"
                placeholder="Installed Date"
              />
              <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-4">
                <div>
                  <Button
                    outlined
                    size="small"
                    text="Clear Filter"
                    disabled={isSubmitting}
                    onClick={() => {
                      resetForm();
                      submit({}, setSubmitting, resetForm);
                    }}
                    style={{ width: "fit-content" }}
                    className="mr-2"
                  />
                  <Button
                    size="small"
                    text="Filter"
                    htmlType="submit"
                    disabled={isSubmitting}
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
