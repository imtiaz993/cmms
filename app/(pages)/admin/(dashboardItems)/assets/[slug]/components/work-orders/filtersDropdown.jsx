import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Select, message } from "antd";
import { login } from "app/services/auth";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const validationSchema = Yup.object().shape({
  assetNumber: Yup.string(),
});

const AssetFilter = () => {
  const handleSubmit = async (values, setSubmitting, resetForm) => {
    console.log(values);

    // const { status, data } = await login(values);
    // setSubmitting(false);
    // if (status === 200) {
    // message.success(data?.message);
    //   resetForm();
    // } else {
    //   message.error(data?.message);
    // }
  };

  return (
    <div className="p-4 bg-tertiary rounded-md max-h-[400px] overflow-auto">
      <Formik
        initialValues={{
          assetNumber: "",
          assetDescription: "",
          altId: "",
          serialNumber: "",
          barcode: "",
          oemSerialNumber: "",
          physicalLocation: "",
          accountingDept: "",
          status: "",
          category: "",
          system: "",
          tier3: "",
          tier4: "",
          tier5: "",
          tier6: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField name="assetNumber" placeholder="Asset #" />
              <InputField
                name="assetDescription"
                placeholder="Asset Description"
              />
              <InputField name="altId" placeholder="Alt ID #" />
              <InputField name="serialNumber" placeholder="Serial #" />
              <InputField name="barcode" placeholder="Barcode" />
              <InputField name="oemSerialNumber" placeholder="OEM Serial #" />
              <Select name="oemSerialNumber" placeholder="Physical Location" />
              <Select name="oemSerialNumber" placeholder="Accounting Dept." />
              <Select name="status" placeholder="Status" />
              <Select name="category" placeholder="Category" />
              <Select name="system" placeholder="System" />
              <Select name="tier3" placeholder="Tier 3" />
              <Select name="tier4" placeholder="Tier 4" />
              <Select name="tier5" placeholder="Tier 5" />
              <Select name="tier6" placeholder="Tier 6" />
              <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-4">
                <div>
                  <Button
                    outlined
                    size="small"
                    text="Clear Filter"
                    disabled={isSubmitting}
                    onClick={resetForm}
                    style={{ width: "fit-content" }}
                    className="mr-2"
                  />
                  <Button
                    size="small"
                    text="Filter"
                    htmlType="submit"
                    disabled={isSubmitting}
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

export default AssetFilter;