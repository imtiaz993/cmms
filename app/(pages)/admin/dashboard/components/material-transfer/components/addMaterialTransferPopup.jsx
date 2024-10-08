import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, message, Modal } from "antd";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const validationSchema = Yup.object().shape({
  costCenter: Yup.string(),
});

const AddMaterialTransferPopup = ({
  addMaterialTransferVisible,
  setAddMaterialTransferVisible,
}) => {
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
    <Formik
      initialValues={{
        costCenter: "",
        cautions: {
          hazardous: false,
          nonHazardous: false,
          msdsSheets: false,
          ppeRequired: false,
          requiresStorage: false,
        },
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        handleSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({ isSubmitting, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Modal
            maskClosable={false}
            title={
              <h1 className="text-lg md:text-2xl mb-5">
                Add Material Transfer
              </h1>
            }
            open={addMaterialTransferVisible}
            onCancel={() => setAddMaterialTransferVisible(false)}
            footer={
              <div className="">
                <div className="mb-3 sm:inline">
                  <Button
                    className="mr-2"
                    onClick={() => setAddMaterialTransferVisible(false)}
                    outlined
                    size="small"
                    text="Cancel"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                  <Button
                    className="mr-2"
                    onClick={() => setAddMaterialTransferVisible(false)}
                    outlined
                    size="small"
                    text="Save as Draft"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  className=""
                  onClick={() => setAddMaterialTransferVisible(false)}
                  size="small"
                  text="Submit For Approval"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
              </div>
            }
            width={1000}
            bodyStyle={{
              height: "400px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <InputField
                name="origination"
                placeholder="Origination"
                maxLength={128}
              />

              <InputField
                name="destination"
                placeholder="Destination"
                maxLength={128}
              />

              <InputField
                name="materialTranfserType"
                placeholder="Material Transfer Type"
                maxLength={128}
              />

              <InputField
                name="transporter"
                placeholder="Transporter"
                maxLength={128}
              />

              <InputField
                name="attentionTo"
                placeholder="Attention To"
                maxLength={128}
              />
            </div>

            <Field
              as={TextArea}
              name="comments"
              placeholder="Comments"
              className="!h-28 !mt-3"
            />
            <div className="mt-5">
              <strong> Cautions</strong>
              <div className="mt-3 sm:flex">
                {[
                  "hazardous",
                  "nonHazardous",
                  "msdsSheets",
                  "ppeRequired",
                  "requiresStorage",
                ].map((caution, index) => (
                  <div className="text-nowrap" key={index}>
                    <Field
                      key={caution}
                      name={`cautions.${caution}`}
                      as={Checkbox}
                      onChange={(e) =>
                        setFieldValue(`cautions.${caution}`, e.target.checked)
                      }
                    >
                      {caution.charAt(0).toUpperCase() +
                        caution.slice(1).replace(/([A-Z])/g, " $1")}
                    </Field>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mt-5">
                <strong>Assets</strong>
                <Button
                  className="ml-4 !text-xs !h-7"
                  size="small"
                  text="Add Assets"
                  fullWidth={false}
                  outlined
                  disabled
                />
              </p>
              <div className="text-center my-3">
                <ExclamationCircleOutlined /> No assets to display
              </div>
            </div>

            <div>
              <p className="mt-5">
                <strong>Inventory</strong>
                <Button
                  className="ml-4 !text-xs !h-7"
                  size="small"
                  text="Add Inventory"
                  fullWidth={false}
                  outlined
                  disabled
                />
              </p>
              <div className="text-center my-3">
                <ExclamationCircleOutlined /> No Inventory to display
              </div>
            </div>
            <Field
              as={TextArea}
              name="misc"
              placeholder="Misc"
              className="!h-28 !mt-3"
            />
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddMaterialTransferPopup;
