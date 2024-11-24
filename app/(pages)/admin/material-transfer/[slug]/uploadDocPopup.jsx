import Button from "@/components/common/Button";
import { message, Modal } from "antd";
import { uploadDoc } from "app/services/materialTransfer";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

const UploadDocPopup = ({ visible, setVisible }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    const { status, data } = await uploadDoc(values);
    if (status === 200) {
      message.success(data.message || "Document uploaded successfully");
    } else {
      message.error(data.message || "Failed to upload document");
    }
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{
        costCenter: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, submitForm }) => (
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
              <div className="flex items-center gap-5 ">
                <Button text="Select File" fullWidth={false} outlined />
                <p>(Max Size 25 MB)</p>
              </div>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default UploadDocPopup;
