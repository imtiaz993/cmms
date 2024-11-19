import React, { useState } from "react";
import { Card, Modal, Table } from "antd";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Button from "@/components/common/Button";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import InputField from "@/components/common/InputField";
import AddFieldPopup from "@/components/addFieldPopup";
import DatePickerField from "@/components/common/DatePickerField";

const validationSchema = Yup.object().shape({
  purchaseDate: Yup.date().required("Required"),
});

const CreatePurchaseOrderPopup = ({ visible, setVisible }) => {
  const [addFieldPopup, setAddFieldPopup] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      item: "",
      description: "",
      quantity: "",
      rate: "",
      total: 0,
      received: "",
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);

  // Function to calculate the Subtotal
  const calculateSubtotal = () => {
    return dataSource.reduce((acc, item) => {
      const total = parseFloat(item.total) || 0;
      return acc + total;
    }, 0);
  };

  // Function to calculate the Final Total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = (subtotal * tax) / 100;
    return subtotal - discountAmount + taxAmount + parseFloat(shipping);
  };

  const handleAddRow = () => {
    setDataSource([
      ...dataSource,
      {
        key: Date.now().toString(),
        item: "",
        description: "",
        quantity: "",
        rate: "",
        total: 0,
        received: "",
      },
    ]);
  };

  const handleDeleteRow = (key) => {
    setDataSource(dataSource.filter((row) => row.key !== key));
  };

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    // Handle submit logic here
    resetForm();
    setVisible(false);
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      render: (_, record) => (
        <InputField
          name={`items[${record.key}].item`}
          type="text"
          placeholder="Item"
          className="!w-24"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <InputField
          name={`items[${record.key}].description`}
          type="text"
          placeholder="Description"
          className="!w-56"
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <InputField
          name={`items[${record.key}].quantity`}
          type="number"
          placeholder="0"
        />
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (_, record) => (
        <InputField
          name={`items[${record.key}].rate`}
          type="number"
          placeholder="0.00"
        />
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Received",
      dataIndex: "received",
      key: "received",
      render: (_, record) => (
        <InputField
          name={`items[${record.key}].received`}
          type="text"
          placeholder="0"
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <DeleteOutlined
          onClick={() => handleDeleteRow(record.key)}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <div>
      <Formik
        initialValues={{
          purchaseDate: "",
          items: dataSource,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <AddFieldPopup
              visible={addFieldPopup}
              setVisible={setAddFieldPopup}
            />
            <Modal
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
                    className="mr-2 !min-w-[125px]"
                    htmlType="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    size="small"
                    text="Download PO"
                    fullWidth={false}
                  />

                  <Button
                    className="mr-2 !min-w-[125px]"
                    htmlType="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    size="small"
                    text="Create PO"
                    fullWidth={false}
                  />
                </div>
              }
              maskClosable={false}
              title="Create Purchase Order"
              width={1000}
            >
              <Card
                title="Purchase Order Details"
                size="medium"
                extra={
                  <Button
                    text="Add Field"
                    fullWidth={false}
                    outlined
                    prefix={<PlusOutlined />}
                    onClick={() => setAddFieldPopup(true)}
                  />
                }
                styles={{ body: { paddingTop: 0 } }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <DatePickerField
                    name="purchaseOrderDate"
                    placeholder="Purchase Order Date"
                  />
                </div>
              </Card>

              <Card
                title="Purchase Order Items"
                size="medium"
                styles={{ body: { paddingTop: 0 } }}
                className="!mt-5"
              >
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  rowClassName="editable-row"
                  size={"medium"}
                  scroll={{ x: 900 }}
                />
                <Button
                  text="Add Item"
                  fullWidth={false}
                  className="mt-3"
                  onClick={handleAddRow}
                />
              </Card>

              <div className="my-8 flex flex-col gap-1 w-64 ml-auto">
                {/* Displaying the calculated fields */}
                <div className="flex justify-between mb-3">
                  <strong>Subtotal:</strong>{" "}
                  <span>{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Discount:</strong>{" "}
                  <InputField
                    name="discount"
                    type="number"
                    label="Discount (%)"
                    placeholder="0%"
                    onChange={(e) => setDiscount(e.target.value)}
                    className="!w-20"
                  />
                </div>
                <div className="flex justify-between">
                  <strong>Tax:</strong>{" "}
                  <InputField
                    name="tax"
                    type="number"
                    label="Tax (%)"
                    placeholder="0%"
                    onChange={(e) => setTax(e.target.value)}
                    className="!w-20"
                  />
                </div>
                <div className="flex justify-between">
                  <strong>Shipping:</strong>{" "}
                  <InputField
                    name="shipping"
                    type="number"
                    label="Shipping"
                    placeholder="0.00"
                    onChange={(e) => setShipping(e.target.value)}
                    className="!w-20"
                  />
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <strong>Total:</strong>{" "}
                  <span>{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePurchaseOrderPopup;
