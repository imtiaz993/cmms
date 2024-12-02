"use client";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, Input, message, Modal, Table } from "antd";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import AddAssetPopupMT from "@/components/addAssetPopupInMT";
import TextAreaField from "@/components/common/TextAreaField";
import {
  addMaterialTransfer,
  saveDraftMaterialTransfer,
} from "app/services/materialTransfer";
import { useSelector } from "react-redux";
import AddInventoryPopupMT from "@/components/addInventoryPopupInMT";
import { useEffect, useState } from "react";
import { getFields } from "app/services/customFields";
import AddFieldPopup from "@/components/addFieldPopup";
import SelectField from "@/components/common/SelectField";
import DatePickerField from "@/components/common/DatePickerField";
import { rigs } from "@/constants/rigsAndSystems";

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
  setMaterialTransferData,
  assetDetailsSlug,
  setAssetDetails,
}) => {
  const [addFieldPopupVisible, setAddFieldPopupVisible] = useState(false);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const { assets } = useSelector((state) => state.assets);
  const { inventory } = useSelector((state) => state.inventory);
  const [addedAssets, setAddedAssets] = useState();
  const [addAssetPopup, setAddAssetPopup] = useState(false);
  const [addInventoryPopup, setAddInventoryPopup] = useState(false);
  const [draft, setDraft] = useState(false);

  useEffect(() => {
    const handleFetchFields = async () => {
      const { status, data } = await getFields("materialTransfer");
      if (status === 200) {
        setFields(data.data);
      } else {
        message.error(data.error);
      }
      setLoading(false);
    };
    handleFetchFields();
  }, []);

  // Generate initial values for custom fields
  const customFieldInitialValues = fields.reduce((acc, field) => {
    acc[field.uniqueKey] = "";
    return acc;
  }, {});

  // Generate validation schema for custom fields
  const customFieldValidations = fields.reduce((acc, field) => {
    switch (field.type) {
      case "text":
      case "dropdown":
        acc[field.uniqueKey] = Yup.string().required(
          `${field.name} is required`
        );
        break;
      case "number":
        acc[field.uniqueKey] = Yup.number()
          .typeError(`${field.name} must be a number`)
          .required(`${field.name} is required`);
        break;
      case "date":
        acc[field.uniqueKey] = Yup.date()
          .typeError(`${field.name} must be a valid date`)
          .required(`${field.name} is required`);
        break;
      default:
        acc[field.uniqueKey] = Yup.string().required(
          `${field.name} is required`
        );
    }
    return acc;
  }, {});

  const validationSchema = Yup.object().shape({
    origination: Yup.string().required("Origination is required."),
    destination: Yup.string()
      .required("Destination is required.")
      .notOneOf(
        [Yup.ref("origination")],
        "Destination must be different from Origination."
      ),
    materialTransferType: Yup.string().required(
      "Material Transfer Type is required."
    ),
    transporter: Yup.string().required("Transporter is required."),
    attentionTo: Yup.string().required("Attention to is required."),
    comments: Yup.string()
      .max(150, "Comments can't exceed 150 characters")
      .required("Comments are required."),
    misc: Yup.string().max(150, "Misc information can't exceed 150 characters"),
    ...customFieldValidations,
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const customFields = fields.map((field) => ({
      uniqueKey: field.uniqueKey,
      value: values[field.uniqueKey],
    }));
    console.log(values);
    const standardValues = { ...values };
    fields.forEach((field) => {
      delete standardValues[field.uniqueKey];
    });

    const transferData = {
      ...values,
      assets: addedAssets, // Append the array of asset IDs
      inventory: selectedRowKeys, // Append the array of inventory IDs
      customFields,
    };

    const { status, data } = await addMaterialTransfer(transferData);
    setSubmitting(false);
    if (status === 200) {
      message.success(data?.message);
      resetForm();
      assetDetailsSlug
        ? setAssetDetails((prev) => ({
            ...prev,
            materialTransfers: [...prev.materialTransfers, data.data],
          }))
        : setMaterialTransferData((prev) => [...prev, data.data]);
      setAddMaterialTransferVisible(false);
    } else {
      message.error(data.error);
    }
  };

  return (
    <>
      <AddFieldPopup
        visible={addFieldPopupVisible}
        setVisible={setAddFieldPopupVisible}
        module="materialTransfer"
        fields={fields}
        setFields={setFields}
      />
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
          ...customFieldInitialValues, // Include custom fields
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
              assetDetailsSlug={assetDetailsSlug}
            />
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
                      className=""
                      onClick={() => submitForm()}
                      size="small"
                      text="Submit For Approval"
                      fullWidth={false}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              }
              width={1000}
              bodyStyle={{
                height: "400px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <div className="flex justify-end mb-5">
                <Button
                  onClick={() => setAddFieldPopupVisible(true)}
                  text="Manage Fields"
                  outlined
                  htmlType="button"
                  fullWidth={false}
                />
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                <SelectField
                  name="origination"
                  placeholder="Origin"
                  options={rigs.map((i) => ({ label: i.name, value: i.id }))}
                />
                <SelectField
                  name="destination"
                  placeholder="Destination"
                  options={rigs.map((i) => ({ label: i.name, value: i.id }))}
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
                      {
                        title: "Asset Id",
                        dataIndex: "id",
                        key: "id",
                        render: (id) =>
                          assets.find((i) => i._id === id).assetNumber,
                      },
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
                        render: (_id) =>
                          inventory.find((i) => i._id === _id)?.partName,
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
              <div className="mt-5">
                <h1 className="text-base font-medium mb-3">Custom Fields:</h1>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {fields.map((field) => {
                  switch (field.type) {
                    case "text":
                      return (
                        <InputField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={field.name}
                        />
                      );
                    case "number":
                      return (
                        <InputField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={field.name}
                          type="number"
                        />
                      );
                    case "dropdown":
                      return (
                        <SelectField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={field.name}
                          options={field.preFilValue.map((value) => ({
                            label: value,
                            value: value,
                          }))}
                        />
                      );
                    case "date":
                      return (
                        <DatePickerField
                          key={field.uniqueKey}
                          name={field.uniqueKey}
                          placeholder={field.name}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddMaterialTransferPopup;
