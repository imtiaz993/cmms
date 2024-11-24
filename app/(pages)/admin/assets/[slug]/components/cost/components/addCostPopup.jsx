import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Modal } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import TextAreaField from "@/components/common/TextAreaField";

const validationSchema = Yup.object().shape({
  costCenter: Yup.string(),
});

const AddCostPopup = ({ visible, setVisible }) => {
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
                  onClick={() => setVisible(false)}
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
                    options={[]}
                  />
                </div>

                <div className="w-full">
                  <SelectField
                    name="vendor"
                    placeholder="Vendor"
                    options={[]}
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
                      options={[
                        { label: "USD", value: "USD" },
                        { label: "EUR", value: "EUR" },
                        { label: "GBP", value: "GBP" },
                      ]}
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
              />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddCostPopup;
