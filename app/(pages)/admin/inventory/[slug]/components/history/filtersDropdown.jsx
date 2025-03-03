import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import { useState } from "react";
import { message } from "antd";

const validationSchema = Yup.object().shape({
  event: Yup.string(),
});

const HistoryFilter = ({ closeDropdown }) => {
  const [isClearing, setIsClearing] = useState(false);
  const handleSubmit = async (values, setSubmitting) => {
    !setSubmitting && setIsClearing(true);
    const status = 404;
    const data = null;
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "History fetched successfully");
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch History");
    }
  };

  return (
    <div className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto shadow-custom">
      <Formik
        initialValues={{
          date: "",
          event: "",
          field: "",
          changedFrom: "",
          changedTo: "",
          actionBy: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <DatePickerField name="date" placeholder="Date" />
              <InputField name="event" placeholder="Event" />
              <InputField name="field" placeholder="Field" />
              <InputField name="changedFrom" placeholder="Changed From" />
              <InputField name="changedTo" placeholder="Changed To" />
              <InputField name="actionBy" placeholder="Action By" />
              <div className="sm:col-span-2 flex justify-end gap-4">
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

export default HistoryFilter;
