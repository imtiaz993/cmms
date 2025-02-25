import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";

const validationSchema = Yup.object().shape({
  inventoryNumber: Yup.string(),
});

const DocumentsFilter = ({ closeDropdown, setDocuments, setIsLoading }) => {
  const [isClearing, setIsClearing] = useState(false);

  const submit = async (values, setSubmitting) => {
    console.log(values);
    !setSubmitting && setIsClearing(true);
    // const { status, data } = await getFilteredDocuments(values);
    const status = null,
      data = null;
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Inventory fetched successfully");
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch inventory");
    }
  };

  return (
    <div className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto shadow-custom">
      <Formik
        initialValues={{
          documentName: "",
          asset: "",
          type: "",
          // category: "",
          uploadedBy: "",
          createdAt: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField name="documentName" placeholder="Document Name" />
              <InputField name="type" placeholder="Type" />
              <InputField name="category" placeholder="Category" />
              <InputField name="uploadedBy" placeholder="Uploaded By" />
              <DatePickerField name="createdAt" placeholder="Created At" />

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
                      submit({});
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
