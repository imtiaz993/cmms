import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Modal } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import TextAreaField from "@/components/common/TextAreaField";
import { addCost } from "app/services/assets";
import UploadDocPopup from "@/components/uploadDocPopup";
import { useParams } from "next/navigation";
import { useState } from "react";
import { currencies } from "@/constants/currencies";

const validationSchema = Yup.object().shape({
  costType: Yup.string().required("Cost Type is required"),
  vendor: Yup.string().required("Vendor is required"),
  poNumber: Yup.string().required("PO Number is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  currency: Yup.string().required("Currency is required"),
  invoiceNumber: Yup.string().required("Invoice Number is required"),
  transcationDate: Yup.date().required("Transaction Date is required"),
  description: Yup.string().required("Description is required"),
});

const AddCostPopup = ({ visible, setVisible, setDetails }) => {
  const [uploadDocument, setUploadDocument] = useState(false);
  const { slug } = useParams();

  const handleSubmit = (values, setSubmitting, resetForm) => {
    console.log("Form submitted with values: ", values);
    const { status, data } = addCost({ ...values, asset: slug });
    if (status === 200) {
      message.success(data?.message || "Cost added successfully");
    } else {
      message.error(data?.message || "Failed to add cost");
    }
    setSubmitting(false);
    resetForm();
    setVisible(false);
  };

  return (
    <Formik
      initialValues={{
        costType: "",
        vendor: "",
        poNumber: "",
        price: "",
        currency: "",
        invoiceNumber: "",
        transcationDate: null,
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <UploadDocPopup
            visible={uploadDocument}
            setVisible={setUploadDocument}
            assetSlug={slug}
            setDetails={setDetails}
          />
          <Modal
            maskClosable={false}
            title={
              <h1 className="text-lg md:text-2xl mb-5">Add Direct Cost</h1>
            }
            open={visible}
            onCancel={() => setVisible(false)}
            footer={
              <div>
                <Button
                  className="mr-2"
                  onClick={() => setVisible(false)}
                  outlined
                  size="small"
                  text="Cancel"
                  fullWidth={false}
                  disabled={isSubmitting}
                />

                <Button
                  className=""
                  onClick={handleSubmit}
                  size="small"
                  text="Add"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
              </div>
            }
            width={1000}
          >
            <div>
              <div className="mt-4 grid md:grid-cols-3 gap-4 w-full items-end md:items-center">
                <div className="w-full">
                  <SelectField
                    name="costType"
                    placeholder="Cost Type"
                    options={[
                      { label: "Purchase Price", value: "purchasePrice" },
                      { label: "Direct Cost", value: "directCost" },
                      {
                        label: "Third Party Labor Cost",
                        value: "thirdPartyLaborCost",
                      },
                      { label: "Parts", value: "parts" },
                      {
                        label: "Third Party Parts & Labor",
                        value: "thirdPartyParts",
                      },
                      {
                        label: "Third Party Material Cost",
                        value: "thirdPartyMaterial",
                      },
                      { label: "State Sales Tax", value: "stateSalesTax" },
                    ]}
                  />
                </div>

                <div className="w-full">
                  <SelectField
                    name="vendor"
                    placeholder="Vendor"
                    options={[
                      { label: "Noram Drilling", value: "noram-drilling" },
                      { label: "NORAM Drilling", value: "noram-drilling2" },
                      { label: "Third Party", value: "third-party" },
                    ]}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="poNumber"
                    placeholder="PO Number"
                    maxLength={128}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-2/3">
                    <InputField
                      name="price"
                      placeholder="Price"
                      maxLength={128}
                    />
                  </div>
                  <div className="w-1/3">
                    <SelectField
                      name="currency"
                      placeholder="Currency"
                      options={currencies}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <InputField
                    name="invoiceNumber"
                    placeholder="Invoice Number"
                    maxLength={128}
                  />
                </div>
                <div className="w-full">
                  <DatePickerField
                    name="transcationDate"
                    placeholder="Transcation Date"
                  />
                </div>
                <div className="w-full md:col-span-3">
                  <TextAreaField name="description" placeholder="Description" />
                </div>
              </div>
              <Button
                fullWidth={false}
                outlined
                text="Upload Documents"
                className="mt-4"
                onClick={() => setUploadDocument(true)}
              />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddCostPopup;
