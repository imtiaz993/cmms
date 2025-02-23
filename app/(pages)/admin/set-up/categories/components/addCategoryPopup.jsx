import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { Form, message, Modal } from "antd";
import { createCategory } from "app/services/setUp/categories";
import { Formik } from "formik";
import * as Yup from "yup";

const AddCategoryPopup = ({ visible, setCategories, setVisible }) => {
  const initialValues = {
    category: "",
  };
  const validationSchema = Yup.object({
    category: Yup.string().required("Category name is required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    const { status, data } = await createCategory(values);
    setSubmitting(false);
    if (status === 200) {
      message.success(data.message);
      setCategories((prev) => [...prev, data.data]);
      resetForm();
      setVisible(false);
    } else {
      message.error(data.error);
    }
  };
  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              maskClosable={false}
              title={
                <h1 className="text-lg md:text-2xl mb-5">Add a Category</h1>
              }
              open={visible}
              onCancel={() => setVisible(false)}
              footer={
                <div>
                  <Button
                    className="mr-4"
                    onClick={() => setVisible(false)}
                    outlined
                    size="small"
                    text="Cancel"
                    fullWidth={false}
                    disabled={false}
                  />

                  <Button
                    className=""
                    onClick={handleSubmit}
                    size="small"
                    text="Add"
                    fullWidth={false}
                    disabled={false}
                  />
                </div>
              }
              width={600}
            >
              <InputField
                name="category"
                placeholder="Enter category name"
                label="Category"
                labelWidth
                required
              />
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategoryPopup;
