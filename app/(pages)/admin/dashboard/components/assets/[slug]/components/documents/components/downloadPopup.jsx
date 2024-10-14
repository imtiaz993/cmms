import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Modal } from "antd";
import { Form, Formik } from "formik";

const DownloadPopup = ({ visible, setVisible }) => {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
        }}
      >
        {({ values, isSubmitting }) => (
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
                    onClick={() => setVisible(false)}
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
