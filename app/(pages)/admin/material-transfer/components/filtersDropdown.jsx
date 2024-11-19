import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Select, message } from "antd";
import { login } from "app/services/auth";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";

const validationSchema = Yup.object().shape({
  assetNumber: Yup.string(),
});

const MaterialTransferFilter = () => {
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    console.log(values);

    // const { status, data } = await login(values);
    // setSubmitting(false);
    // if (status === 200) {
    // message.success(data?.message);
    //   resetForm();
    // } else {
    //   message.error(data?.message);
    // }
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
          materialTranfser: "",
          origination: "",
          destination: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <DatePickerField
                name="createdDateRange"
                placeholder="Created Date Range"
              />

              <InputField
                name="materialTranfser"
                placeholder="Material Transfer"
              />
              <SelectField name="origination" placeholder="Origination" />
              <SelectField name="destination" placeholder="Destination" />

              <div className="sm:col-span-2 flex justify-end gap-4">
                <div>
                  <Button
                    outlined
                    size="small"
                    text="Clear Filter"
                    disabled={isSubmitting}
                    onClick={resetForm}
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
