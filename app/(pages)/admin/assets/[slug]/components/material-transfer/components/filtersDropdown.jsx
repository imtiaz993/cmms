import { useState } from "react";
import { Form, Formik } from "formik";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import { getFilteredMT } from "app/services/materialTransfer";
import { useParams } from "next/navigation";

const MaterialTransferFilter = ({ setDetails, closeDropdown }) => {
  const { slug } = useParams();
  const [isClearing, setIsClearing] = useState(false);
  const submit = async (values, setSubmitting) => {
    console.log(values);
    !setSubmitting && setIsClearing(true);
    const { status, data } = await getFilteredMTinAssets(values, slug);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(
        data?.message || "Material Transfers fetched successfully"
      );
      setDetails((prev) => ({ ...prev, materialTransfers: data?.data }));
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch material transfers");
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
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
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

export default MaterialTransferFilter;
