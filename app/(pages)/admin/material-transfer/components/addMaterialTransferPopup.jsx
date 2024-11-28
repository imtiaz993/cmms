import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, Input, message, Modal, Table } from "antd";
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
import { useSelector } from "react-redux";
import AddInventoryPopupMT from "@/components/addInventoryPopupInMT";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
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
});

const columns = [
  {
    title: "Part Name",
    dataIndex: "partName",
    key: "partName",
  },
  {
    title: "Part Number",
    dataIndex: "partItem",
    key: "partItem",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "PO",
    dataIndex: "PO",
    key: "PO",
  },
  {
    title: "SO",
    dataIndex: "SO",
    key: "SO",
  },
  {
    title: "Invoice number",
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
  },
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "Received Date",
    dataIndex: "receivedDate",
    key: "receivedDate",
  },
];

// AddMaterialTransferPopup component
const AddMaterialTransferPopup = ({
  addMaterialTransferVisible,
  setAddMaterialTransferVisible,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  const [addedAssets, setAddedAssets] = useState();
  const [addAssetPopup, setAddAssetPopup] = useState(false);
  const [addInventoryPopup, setAddInventoryPopup] = useState(false);
  const [draft, setDraft] = useState(false);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    const transferData = {
      ...values,
      assets: addedAssets, // Append the array of asset IDs
      inventory: selectedRowKeys, // Append the array of inventory IDs
    };

    let response;
    if (draft) {
      response = await saveDraftMaterialTransfer(transferData);
    } else {
      response = await addMaterialTransfer(transferData);
    }

    const { status, data } = response;

    setSubmitting(false);
    if (status === 200) {
      message.success(data?.message);
      resetForm();
      setAddMaterialTransferVisible(false);
    } else {
      message.error(data?.message);
    }
  };

  return (
    <Formik
      initialValues={{
        origination: "",
        destination: "",
        materialTransferType: "",
        transporter: "",
        attentionTo: "",
        comments: "",
        misc: "",
        assets: [],
        inventory: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, submitForm }) => (
        <Form onSubmit={handleSubmit}>
          <AddAssetPopupMT
            visible={addAssetPopup}
            setVisible={setAddAssetPopup}
            setAddedAssets={setAddedAssets}
          />
          {console.log("selected row keys", selectedRowKeys)}
          <AddInventoryPopupMT
            visible={addInventoryPopup}
            setVisible={setAddInventoryPopup}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
          {console.log("addedAssets", addedAssets)}
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
                plac
                eholder="Destination"
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
                <strong>Asset</strong>
                <Button
                  className="ml-4 !text-xs !h-7"
                  size="small"
                  text="Add Asset"
                  fullWidth={false}
                  outlined
                  onClick={() => setAddAssetPopup(true)}
                />
              </p>
              {addedAssets ? (
                <Table
                  dataSource={[addedAssets]}
                  columns={[
                    { title: "Asset Id", dataIndex: "id", key: "id" },
                    {
                      title: "Asset Condtion",
                      dataIndex: "condition",
                      key: "condition",
                    },
                    {
                      title: "Transfer Reason",
                      dataIndex: "transferReason",
                      key: "transferReason",
                    },
                    //{ title: "Include Asset Parents?", dataIndex: "childAssetsParents", key: "childAssetsParents",},
                  ]}
                  pagination={false}
                  size="small"
                />
              ) : (
                <div className="text-center my-3">
                  <ExclamationCircleOutlined /> No assets to display
                </div>
              )}
            </div>

            <div>
              <p className="my-5">
                <strong>Inventory</strong>
                <Button
                  className="ml-4 !text-xs !h-7"
                  size="small"
                  text="Add Inventory"
                  onClick={() => setAddInventoryPopup(true)}
                  fullWidth={false}
                  outlined
                />
              </p>
              {selectedRowKeys.length > 0 ? (
                <Table
                  dataSource={selectedRowKeys.map((key) => ({
                    _id: key,
                  }))}
                  columns={[
                    {
                      title: "",
                      dataIndex: "",
                      key: "",
                      render: (text, record, index) => index + 1,
                    },
                    {
                      title: "Inventory Id",
                      dataIndex: "_id",
                      key: "_id",
                    },
                  ]}
                  pagination={false}
                  size="small"
                />
              ) : (
                <div className="text-center my-3">
                  <ExclamationCircleOutlined /> No Inventory to display
                </div>
              )}
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
