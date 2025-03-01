import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import SelectField from "@/components/common/SelectField";
import { getDocumentsByCategory } from "app/services/document";

const validationSchema = Yup.object().shape({
  inventoryNumber: Yup.string(),
});

const DocumentsFilter = ({
  closeDropdown,
  setDocuments,
  setIsLoading,
  superUsers,
  asset,
  materialTransfer,
  inventory,
}) => {
  const [isClearing, setIsClearing] = useState(false);

  const submit = async (values, setSubmitting) => {
    !setSubmitting && setIsClearing(true);
    const { status, data } = await getDocumentsByCategory(values);
    // const status = null,
    //   data = null;
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      setDocuments(data?.data);
      message.success(data?.message || "Documents fetched successfully");
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch documents");
    }
  };

  return (
    <div className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto shadow-custom">
      <Formik
        initialValues={{
          title: "",
          asset: asset || "",
          inventoryNumber: inventory || "",
          type: "",
          // category: "",
          uploadedBy: "",
          createdAt: "",
          materialTransfer: materialTransfer || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField name="title" placeholder="Document Name" />
              <SelectField
                name="type"
                placeholder="Select Type"
                options={[
                  { label: "Contract", value: "contract" },
                  { label: "Invoice", value: "invoice" },
                  { label: "Other", value: "other" },
                ]}
                required
                // label="Type"
              />
              {/* <InputField name="type" placeholder="Type" /> */}
              <SelectField
                name="category"
                placeholder="Category"
                options={[
                  { label: "Asset", value: "asset" },
                  { label: "Inventory", value: "inventory" },
                  { label: "Work Order", value: "workOrder" },
                  { label: "Material Transfer", value: "materialTransfer" },
                ]}
                required
                // label="Type"
              />
              {/* <InputField name="category" placeholder="Category" /> */}
              {/* <InputField name="uploadedBy" placeholder="Uploaded By" /> */}
              <SelectField
                name="uploadedBy"
                placeholder="Uploaded By"
                options={superUsers.map((user) => ({
                  label: user?.name,
                  value: user?._id,
                }))}
                required
                // label="Type"
              />
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
