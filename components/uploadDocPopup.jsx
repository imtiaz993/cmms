import Button from "@/components/common/Button";
import { message, Modal, Upload } from "antd";
import { uploadDoc } from "app/services/document";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import SelectField from "@/components/common/SelectField";
import InputField from "@/components/common/InputField";

const validationSchema = Yup.object().shape({
  document: Yup.mixed().required("A file is required").nullable(),
  documentType: Yup.string().required("Document type is required"),
  description: Yup.string().max(128, "Description is too long").nullable(),
});

const UploadDocPopup = ({
  visible,
  setVisible,
  assetSlug,
  materialTransferSlug,
  setDetails,
  workOrderSlug,
}) => {
  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState(""); // State to store the selected file name

  const handleFileChange = (info) => {
    if (info.fileList.length > 1) {
      // Only allow 1 file to be selected
      setFileList([info.fileList[info.fileList.length - 1]]);
      setFileName(info.fileList[0].name); // Set file name when file is selected
    } else {
      setFileList(info.fileList);
      setFileName(info.fileList.length ? info.fileList[0].name : ""); // Update file name when file is selected
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    console.log(values);
    formData.append("document", values.document[0]);
    assetSlug
      ? formData.append("asset", assetSlug)
      : materialTransferSlug
      ? formData.append("materialTransfer", materialTransferSlug)
      : workOrderSlug
      ? formData.append("workOrder", workOrderSlug)
      : null;
    formData.append("type", values.documentType);
    formData.append("description", values.description);
    formData.append("title", fileName);

    const { status, data } = await uploadDoc(formData);
    if (status === 200) {
      message.success(data.message || "Document uploaded successfully");
      setDetails &&
        setDetails((prev) => ({
          ...prev,
          documents: [...(prev.documents ?? []), data?.data],
        }));
      setFileList([]);
      setFileName(""); // Clear file name after successful upload
      resetForm();
      setVisible(false);
    } else {
      message.error(data.message || "Failed to upload document");
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        document: [],
        documentType: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, submitForm, setFieldValue }) => (
        <Form>
          <Modal
            maskClosable={false}
            title={
              <h1 className="text-lg md:text-2xl mb-5">Upload Document</h1>
            }
            open={visible}
            onCancel={() => setVisible(false)}
            footer={
              <div className="my-7">
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
                  onClick={() => submitForm()}
                  size="small"
                  text="Add to Documents"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
              </div>
            }
            width={1000}
          >
            <div>
              <div className="flex items-center gap-5">
                <Upload
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                  fileList={fileList}
                  beforeUpload={(file) => {
                    setFieldValue("document", [file]);
                    return false; // prevent upload to server immediately
                  }}
                  onChange={handleFileChange}
                  showUploadList={false}
                >
                  <Button text="Select File" fullWidth={false} outlined />
                </Upload>
                <p>(Max Size 25 MB)</p>
              </div>
              {fileName && (
                <div className="mt-2 text-gray-600">
                  <strong>Selected File:</strong> {fileName}
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="md:w-1/3">
                  <SelectField
                    name="documentType"
                    placeholder="Document Type"
                    options={[
                      { label: "Contract", value: "contract" },
                      { label: "Invoice", value: "invoice" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                </div>

                <div className="md:w-2/3">
                  <InputField
                    name="description"
                    placeholder="Document Description"
                    maxLength={128}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default UploadDocPopup;
