import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Form, message, Modal } from "antd";
import { createSubCategory } from "app/services/setUp/subCategories";
import { Formik } from "formik";
import * as Yup from "yup";

const AddSubCategoryPopup = ({
  visible,
  setVisible,
  setSubCategories,
  categories,
}) => {
  const initialValues = {
    category: "",
    subCategory: "",
  };
  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    subCategory: Yup.string().required("Sub Category name is required"),
  });
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    console.log("Submitted");
    const { status, data } = await createSubCategory(values);
    setSubmitting(false);
    if (status === 200) {
      setSubCategories((prev) => [...prev, data.data]);
      message.success(data.message);
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
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              maskClosable={false}
              title={
                <h1 className="text-lg md:text-2xl mb-5">Add a Sub-Category</h1>
              }
              open={visible}
              onCancel={() => {
                if (!isSubmitting) {
                  setVisible(false);
                  resetForm();
                }
              }}
              footer={
                <div>
                  <Button
                    className="mr-4"
                    onClick={() => {
                      setVisible(false);
                      resetForm();
                    }}
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
                    isLoading={isSubmitting}
                  />
                </div>
              }
              width={600}
            >
              <SelectField
                name="category"
                placeholder="Select category"
                label="Category"
                required
                options={categories.map((cat) => ({
                  label: cat.category,
                  value: cat._id,
                }))}
              />
              <div className="mt-5">
                <InputField
                  name="subCategory"
                  placeholder="Enter sub-category name"
                  label="Sub-Category"
                  required
                />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSubCategoryPopup;
