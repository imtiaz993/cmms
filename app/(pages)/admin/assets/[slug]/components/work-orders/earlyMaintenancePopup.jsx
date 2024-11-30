import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, Dropdown, Menu, message, Modal, Space, Table } from "antd";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { SettingOutlined } from "@ant-design/icons";
import CreatePlannedWOPopup from "./createPlannedWOPopup";

const validationSchema = Yup.object().shape({
  costCenter: Yup.string(),
});

const columns = [
  {
    title: "Asset",
    dataIndex: "asset",
    key: "asset",
  },
  {
    title: "Event Type",
    dataIndex: "eventType",
    key: "eventType",
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    key: "frequency",
  },
  {
    title: "Next Scheduled Date",
    dataIndex: "nextScheduledDate",
    key: "nextScheduledDate",
  },
  {
    title: "",
    dataIndex: "Action",
    key: "Action",
    render: (_, record) => (
      <Space size="middle">
        <a className="text-secondary hover:text-opacity-50 hover:text-secondary">
          Open Today
        </a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    asset: "CBV-755982",
    eventType: "General",
    frequency: "180 Day",
    nextScheduledDate: "March 26, 2025",
  },
  {
    key: "2",
    asset: "CBV-755982",
    eventType: "General",
    frequency: "180 Day",
    nextScheduledDate: "March 26, 2025",
  },
  {
    key: "3",
    asset: "CBV-755982",
    eventType: "General",
    frequency: "180 Day",
    nextScheduledDate: "March 26, 2025",
  },
  {
    key: "4",
    asset: "CBV-755982",
    eventType: "General",
    frequency: "180 Day",
    nextScheduledDate: "March 26, 2025",
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const EarlyMaintenancePopup = ({ visible, setVisible }) => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [createPlannedWOPopup, setCreatePlannedWOPopup] = useState(false);

  const options = columns.map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

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
          <CreatePlannedWOPopup
            visible={createPlannedWOPopup}
            setVisible={setCreatePlannedWOPopup}
          />
          <Modal
            maskClosable={false}
            title={
              <h1 className="text-lg md:text-2xl mb-5">
                Open Early Maintenance
              </h1>
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
                  text="Create Work Order"
                  fullWidth={false}
                  disabled={isSubmitting}
                />
              </div>
            }
            width={1000}
          >
            <div>
              <div className="flex gap-8">
                <div className="w-1/2">
                  <InputField
                    name="costCenter"
                    placeholder="Cost Center"
                    maxLength={128}
                  />
                </div>
                <div className="w-52">
                  <Dropdown
                    dropdownRender={() => (
                      <Menu>
                        <Menu.ItemGroup title="Select Columns">
                          {options.map((option) => (
                            <Menu.Item
                              key={option.value}
                              style={{ display: "flex", alignItems: "center" }}
                              onClick={(e) => e?.stopPropagation()}
                            >
                              <Checkbox
                                value={option.value}
                                checked={checkedList.includes(option.value)}
                                onChange={() => {
                                  handleCheckboxChange(option.value);
                                }}
                              >
                                {option.label}
                              </Checkbox>
                            </Menu.Item>
                          ))}
                        </Menu.ItemGroup>
                      </Menu>
                    )}
                    trigger={["click"]}
                    arrow
                    placement="bottomCenter"
                  >
                    <Button
                      text="Column Settings"
                      outlined
                      style={{ padding: "4px 24px" }}
                      prefix={<SettingOutlined />}
                    />
                  </Dropdown>
                </div>
              </div>
              <div className="flex justify-end">
                <p className="text-secondary">
                  Total Documents: <span>{"(" + data.length + ")"}</span>
                </p>
              </div>
              <Table
                loading={false}
                size={"large"}
                // scroll={{ x: 1100 }}
                onRow={(row) => ({
                  onClick: () => setCreatePlannedWOPopup(true),
                  style: { cursor: "pointer" },
                })}
                columns={columns}
                dataSource={data}
                pagination={{
                  total: data.total,
                  current: 1,
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                  onChange: () => {},
                }}
                style={{
                  marginTop: 16,
                  overflow: "auto",
                }}
              />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default EarlyMaintenancePopup;
