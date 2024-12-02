import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Select,
  Button as AntButton,
  Popconfirm,
  message,
  Tabs,
} from "antd";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { addField, deleteField, getFields } from "app/services/customFields";

const { Option } = Select;
const { TabPane } = Tabs;

// Validation Schema
const FieldValidationSchema = Yup.object().shape({
  name: Yup.string().required("Field Name is required"),
  type: Yup.string().required("Field Type is required"),
  preFilValue: Yup.string().when("type", {
    is: (value) => value === "dropdown",
    then: (schema) => schema.required("Dropdown options are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// Component: Existing Fields List
const ExistingFields = ({ fields, onDelete }) => {
  return (
    <div>
      {fields && fields.length > 0 ? (
        fields.map((field, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              padding: "10px 0",
            }}
          >
            <div style={{ flex: 2 }}>
              <strong>{field.name}</strong>
              <p style={{ margin: 0 }}>Type: {field.type}</p>
              {field.type === "dropdown" && (
                <p style={{ margin: 0 }}>
                  <strong>Options:</strong> {field.preFilValue.join(", ")}
                </p>
              )}
            </div>
            <Popconfirm
              title="Are you sure you want to delete this field?"
              onConfirm={() => onDelete(field?._id)}
              okText="Yes"
              cancelText="No"
            >
              <AntButton type="text" danger size="small">
                Delete
              </AntButton>
            </Popconfirm>
          </div>
        ))
      ) : (
        <p>No fields added yet.</p>
      )}
    </div>
  );
};

// Component: Add New Field Form
const AddFieldForm = ({ onAddField }) => {
  return (
    <Formik
      initialValues={{ name: "", type: "", preFilValue: "" }}
      validationSchema={FieldValidationSchema}
      onSubmit={(values, { resetForm }) => {
        const newField = {
          ...values,
          preFilValue:
            values.type === "dropdown"
              ? values.preFilValue.split(",").map((opt) => opt.trim())
              : [],
        };
        onAddField(newField);
        resetForm();
        message.success("Field added successfully!");
      }}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form>
          <div style={{ marginBottom: "20px" }}>
            {/* Field Name Input */}
            <InputField
              name="name"
              placeholder="Enter field name"
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
            />

            {/* Field Type Dropdown */}
            <Field
              as={Select}
              placeholder="Select field type"
              value={values.type || undefined}
              onChange={(value) => setFieldValue("type", value)}
              style={{ height: "36px", width: "100%", marginTop: "12px" }}
            >
              <Option value="text">Text</Option>
              <Option value="number">Number</Option>
              <Option value="dropdown">Dropdown</Option>
              <Option value="date">Date</Option>
            </Field>
            <ErrorMessage
              name="type"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            {/* Dropdown Options Input */}
            {values.type === "dropdown" && (
              <InputField
                name="preFilValue"
                placeholder="Comma-separated options (e.g., Option1, Option2)"
                value={values.preFilValue}
                onChange={(e) => setFieldValue("preFilValue", e.target.value)}
                className="!mt-3"
              />
            )}
          </div>
          <div>
            <Button
              type="primary"
              text="Add Field"
              htmlType="submit"
              style={{ marginRight: "10px" }}
              fullWidth={false}
            />

            <Button
              text="Reset"
              outlined
              onClick={() => resetForm()}
              fullWidth={false}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

// Main Component: AddFieldModal
const AddFieldPopup = ({ visible, setVisible, module, fields, setFields }) => {
  const handleAddField = async (field) => {
    const { status, data } = await addField(module, field);
    if (status === 200) {
      setFields([...fields, data.data]);
    } else {
      message.error(data.error);
    }
  };

  const handleDeleteField = async (id) => {
    const { status, data } = await deleteField(id);
    if (status === 200) {
      setFields(fields.filter((f) => f?._id !== id));
    } else {
      message.error(data.error);
    }
  };

  return (
    <Modal
      title="Manage Fields"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      width={700}
      bodyProps={{ style: { minHeight: "200px" } }}
      // destroyOnClose
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Existing Fields" key="1">
          <ExistingFields fields={fields} onDelete={handleDeleteField} />
        </TabPane>
        <TabPane tab="Add New Field" key="2">
          <AddFieldForm onAddField={handleAddField} />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AddFieldPopup;
