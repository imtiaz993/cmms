import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Select, message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const validationSchema = Yup.object().shape({
  assetNumber: Yup.string(),
});

const MaintenanceScheduleFilter = () => {
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
    <div className="p-4 bg-tertiary rounded-md max-h-[400px] overflow-auto">
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
              <Field
                as={DatePicker}
                name="createdDateRange"
                placeholder="Created Date Range"
              />

              <InputField
                name="materialTranfser"
                placeholder="Material Transfer"
              />
              <Select name="origination" placeholder="Origination" />
              <Select name="destination" placeholder="Destination" />

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

export default MaintenanceScheduleFilter;
