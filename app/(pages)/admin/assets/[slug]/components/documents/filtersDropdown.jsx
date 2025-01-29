import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import { useState } from "react";
import { message } from "antd";

const validationSchema = Yup.object().shape({
  title: Yup.string(),
});

const DocumentsFilter = ({ closeDropdown }) => {
  const [isClearing, setIsClearing] = useState(false);
  const handleSubmit = async (values, setSubmitting) => {
    !setSubmitting && setIsClearing(true);
    const status = 404;
    const data = null;
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Documents fetched successfully");
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch Documents");
    }
  };

  return (
    <div className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto shadow-custom">
      <Formik
        initialValues={{
          title: "",
          asset: "",
          type: "",
          category: "",
          uploadedBy: "",
          createdAt: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField name="title" placeholder="Document Name" />
              <InputField name="asset" placeholder="Asset Number" />
              <InputField name="type" placeholder="Document Type" />
              <InputField name="category" placeholder="Category" />
              <InputField name="uploadedBy" placeholder="Uploaded By" />
              <DatePickerField name="createdAt" placeholder="Created At" />

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

export default DocumentsFilter;
