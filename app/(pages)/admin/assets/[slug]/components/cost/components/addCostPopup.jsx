import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, Input, Modal, Select, TimePicker } from "antd";
import InputField from "@/components/common/InputField";
import TextArea from "antd/es/input/TextArea";
import Button from "@/components/common/Button";

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
            // bodyStyle={{
            //   height: "400px",
            //   overflowY: "auto",
            //   overflowX: "hidden",
            // }}
          >
            <div>
              <div className="mt-4 grid md:grid-cols-3 gap-4 w-full items-end md:items-center">
                <div className="w-full">
                  <Field
                    as={Select}
                    name="costType"
                    placeholder="Cost Type"
                    style={{ height: "36px", width: "100%" }}
                  />
                </div>

                <div className="w-full">
                  <Field
                    as={Select}
                    name="vendor"
                    placeholder="Vendor"
                    style={{ height: "36px", width: "100%" }}
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
                    <Field
                      as={Select}
                      name="currency"
                      placeholder="Currency"
                      style={{ height: "36px", width: "100%" }}
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
                  <Field
                    as={DatePicker}
                    name="transcationDate"
                    placeholder="Transcation Date"
                    style={{ height: "36px", width: "100%" }}
                  />
                </div>
                <div className="w-full md:col-span-3">
                  <Field
                    as={Input.TextArea}
                    name="description"
                    placeholder="Description"
                    style={{ height: "80px", width: "100%" }}
                    className="!border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F]"
                  />
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
