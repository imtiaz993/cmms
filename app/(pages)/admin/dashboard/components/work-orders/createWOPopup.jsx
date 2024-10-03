import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message, Modal } from "antd";

const validationSchema = Yup.object().shape({
  costCenter: Yup.string(),
});

const CreateWOPopup = ({ addWOVisible, setAddWOVisible }) => {
  return (
    <Formik
      initialValues={{
        costCenter: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        handleSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Modal
            maskClosable={false}
            title={
              <h1 className="text-lg md:text-2xl mb-5">Add New WO</h1>
            }
            open={addWOVisible}
            onCancel={() => setAddWOVisible(false)}
            footer={null}
            width={1000}
            bodyStyle={{
              height: "400px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          ></Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateWOPopup;
