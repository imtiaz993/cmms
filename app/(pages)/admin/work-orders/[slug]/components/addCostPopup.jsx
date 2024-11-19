import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { DatePicker, Modal, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Field, Form, Formik } from "formik";

const AddCostPopup = ({ visible, setVisible }) => {
  return (
    <div>
      <Formik
        initialValues={{}}
        // validationSchema={{}}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setVisible(false);
        }}
      >
        {({ values, isSubmitting, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              maskClosable={false}
              title="Add Cost Popup"
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
                    onClick={() => setVisible(false)}
                    size="small"
                    text="Add"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
              width={800}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <Field
                  as={DatePicker}
                  name="createdDate"
                  placeholder="Created Date"
                  className="w-full"
                  style={{ height: "36px" }}
                />
                <Field
                  as={TimePicker}
                  name="createdTime"
                  placeholder="Created Time"
                  className="w-full"
                  style={{ height: "36px" }}
                />
                <SelectField
                  name="costType"
                  placeholder="Cost Type"
                  options={[
                    { label: "Purchase Price", value: "purchasePrice" },
                    { label: "Direct Cost", value: "directCost" },
                    {
                      label: "Third Party Labor Cost",
                      value: "thirdPartyLaborCost",
                    },
                    { label: "Parts", value: "parts" },
                    {
                      label: "Third Party Parts & Labor",
                      value: "thirdPartyParts",
                    },
                    {
                      label: "Third Party Material Cost",
                      value: "thirdPartyMaterial",
                    },
                    { label: "State Sales Tax", value: "stateSalesTax" },
                  ]}
                  style={{ height: "36px" }}
                />
                <InputField name="item" placeholder="Item" />
                <InputField name="description" placeholder="Description" />{" "}
                <InputField name="quantity" placeholder="Quantity" />{" "}
                <InputField name="costEach" placeholder="Cost Each" />
                <SelectField
                  name="currency"
                  placeholder="Currency"
                  options={[{ label: "USD", value: "USD" }]}
                />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCostPopup;
