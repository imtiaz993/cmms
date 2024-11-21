import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { message, Modal } from "antd";
import { downloadAllDocuments } from "app/services/document";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("File Name is Required"),
});

const DownloadPopup = ({ visible, setVisible, selectedCategories }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
    const { status, data } = await downloadAllDocuments(
      values,
      selectedCategories
    );
    setSubmitting(false);
    if (status === 200) {
      message.success(data?.message || "Documents downloaded successfully");
      setVisible(false);
    } else {
      message.error(data?.message || "Failed to download documents");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, submitForm }) => (
          <Form>
            <Modal
              maskClosable={false}
              open={visible}
              onCancel={() => setVisible(false)}
              title="Downloading 40 Documents"
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
                    htmlType="submit"
                    onClick={() => submitForm()}
                    size="small"
                    text="Download"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
            >
              <div className="my-8">
                <label className="text-secondary mb-2 block">Save As</label>
                <InputField
                  name="name"
                  placeholder="File Name"
                  type="text"
                  size="large"
                />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DownloadPopup;
