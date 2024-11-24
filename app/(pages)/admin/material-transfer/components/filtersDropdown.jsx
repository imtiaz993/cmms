import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Select, message } from "antd";
import { login } from "app/services/auth";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import { getFilteredMT } from "app/services/materialTransfer";

const MaterialTransferFilter = ({ setMaterialTransferData }) => {
  const submit = async (values, setSubmitting) => {
    console.log(values);
    const { status, data } = await getFilteredMT(values);
    setSubmitting(false);
    if (status === 200) {
      message.success(data?.message || "Assets fetched successfully");
      setMaterialTransferData(data?.data);
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
          createdDateRange: "",
          materialTransferType: "",
          origination: "",
          destination: "",
          Transporter: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <DatePickerField
                name="createdDateRange"
                placeholder="Created Date Range"
              />

              <InputField
                name="origination"
                placeholder="Origin"
                maxLength={128}
              />
              <InputField
                name="destination"
                placeholder="Destination"
                maxLength={128}
              />
              <InputField
                name="materialTransferType"
                placeholder="Transfer Type"
                maxLength={128}
              />
              <InputField
                name="transporter"
                placeholder="Transporter"
                maxLength={128}
              />

              <div className="sm:col-span-2 flex justify-end gap-4">
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

export default MaterialTransferFilter;
