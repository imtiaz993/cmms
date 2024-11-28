import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Divider, message, Modal, Select } from "antd";
import { uploadLinkDoc } from "app/services/materialTransfer";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  linkUrl: Yup.string().required("Required"),
  documentType: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const UploadLinkDocPopup = ({ visible, setVisible, setDetails }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log(values);
    const { status, data } = await uploadLinkDoc(values);
    if (status === 200 || true) {
      message.success(data.message || "Document uploaded successfully");
      setDetails((prev) => ({
        ...prev,
        documents: [...(prev.documents ?? []), values],
      }));
      setVisible(false);
      resetForm();
    } else {
      message.error(data.message || "Failed to upload document");
    }
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{
        title: "",
        linkUrl: "",
        documentType: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, submitForm }) => (
        <Form>
          <Modal
            maskClosable={false}
            title={<h1 className="text-lg md:text-2xl mb-5">Link Document</h1>}
            open={visible}
            onCancel={() => setVisible(false)}
            footer={
              <div className="mt-7">
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
              {/* <div className="flex items-center gap-5 ">
                <Button text="Add Link" fullWidth={false} outlined />
                <p>Add additional links to your upload</p>
              </div>
              <div></div>
              <Divider /> */}
              <div className="mt-4 grid md:grid-cols-3 gap-4 w-full items-end md:items-center">
                <div className="w-full">
                  <InputField
                    name="title"
                    placeholder="Link Title"
                    maxLength={50}
                  />
                </div>
                <div className="w-full md:col-span-2">
                  <InputField
                    name="linkUrl"
                    placeholder="Link Url"
                    maxLength={128}
                  />
                </div>

                <div className="w-full">
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

                <div className="w-full md:col-span-2">
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

export default UploadLinkDocPopup;
