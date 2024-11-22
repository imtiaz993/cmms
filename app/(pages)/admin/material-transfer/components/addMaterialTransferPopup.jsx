import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, Input, message, Modal } from "antd";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import AddAssetPopupMT from "@/components/addAssetPopupInMT";
import { useState } from "react";
import TextAreaField from "@/components/common/TextAreaField";
import {
  addMaterialTransfer,
  saveDraftMaterialTransfer,
} from "app/services/materialTransfer";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  costCenter: Yup.string().required("Cost center is required."),
  origination: Yup.string()
    .max(128, "Origination can't exceed 128 characters")
    .required("Origination is required."),
  destination: Yup.string()
    .max(128, "Destination can't exceed 128 characters")
    .required("Destination is required."),
  materialTransferType: Yup.string().required(
    "Material Transfer Type is required."
  ),
  transporter: Yup.string().required("Transporter is required."),
  attentionTo: Yup.string().required("Attention to is required."),
  comments: Yup.string()
    .max(150, "Comments can't exceed 150 characters")
    .required("Comments are required."),
  misc: Yup.string().max(150, "Misc information can't exceed 150 characters"),
  cautions: Yup.object().shape({
    hazardous: Yup.bool(),
    nonHazardous: Yup.bool(),
    msdsSheets: Yup.bool(),
    ppeRequired: Yup.bool(),
    requiresStorage: Yup.bool(),
  }),
});

// AddMaterialTransferPopup component
const AddMaterialTransferPopup = ({
  addMaterialTransferVisible,
  setAddMaterialTransferVisible,
  setMaterialTransferData,
}) => {
  const [addAssetPopup, setAddAssetPopup] = useState(false);
  const [draft, setDraft] = useState(false);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    let response;
    if (draft) {
      response = await saveDraftMaterialTransfer(values);
    } else {
      response = await addMaterialTransfer(values);
    }

    const { status, data } = response;

    setSubmitting(false);
    if (status === 200) {
      message.success(data?.message);
      resetForm();
      // setMaterialTransferData();
      setAddMaterialTransferVisible(false);
    } else {
      message.error(data?.message);
    }
  };

  return (
    <Formik
      initialValues={{
        costCenter: "",
        origination: "",
        destination: "",
        materialTransferType: "",
        transporter: "",
        attentionTo: "",
        comments: "",
        misc: "",
        cautions: {
          hazardous: false,
          nonHazardous: false,
          msdsSheets: false,
          ppeRequired: false,
          requiresStorage: false,
        },
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, submitForm }) => (
        <Form onSubmit={handleSubmit}>
          <AddAssetPopupMT
            visible={addAssetPopup}
            setVisible={setAddAssetPopup}
          />
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
              <div>
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
                    onClick={() => {
                      setDraft(true);
                      submitForm();
                    }}
                    outlined
                    size="small"
                    text="Save as Draft"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  className=""
                  onClick={() => submitForm()}
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
                placeholder="Origin"
                maxLength={128}
              />
              <InputField
                name="destination"
                placeholder="Destination"
                maxLength={128}
              />
              <InputField
                name="materialTransferType"
                placeholder="Transfer Type"
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

            <div className="mt-3">
              <TextAreaField
                name="comments"
                placeholder="Comments"
                maxLength={150}
              />
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
                  onClick={() => setAddAssetPopup(true)}
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

            <div className="my-3">
              <TextAreaField name="misc" placeholder="Misc" />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddMaterialTransferPopup;
