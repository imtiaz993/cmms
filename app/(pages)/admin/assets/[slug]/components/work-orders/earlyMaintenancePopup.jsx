import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, Dropdown, Menu, message, Modal, Space, Table } from "antd";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { SettingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreatePlannedWOPopup from "./createPlannedWOPopup";
import { getEarlyMaintenanceData } from "app/services/workOrders";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  costCenter: Yup.string(),
});

const columns = [
  {
    title: "Asset",
    dataIndex: "assetNumber",
    key: "assetNumber",
  },
  {
    title: "Event Type",
    dataIndex: "eventType",
    key: "eventType",
  },
  {
    title: "Frequency",
    dataIndex: "duration",
    key: "frequency",
  },
  {
    title: "Next Scheduled Date",
    dataIndex: "maintStartDate",
    key: "maintStartDate",
    render: (_, record) => {
      // Convert timestamp to Date object
      const date = dayjs(record.maintStartDate).format("MMM DD, YYYY");
      // Use date-fns to format the date as MM/DD/YYYY
      return date;
    },
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

const defaultCheckedList = columns.map((item) => item.key);

const EarlyMaintenancePopup = ({ visible, setVisible }) => {
  const [data, setData] = useState();
  const [fetching, setFetching] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [createPlannedWOPopup, setCreatePlannedWOPopup] = useState(false);
  const [plannedWOAsset, setPlannedWOAsset] = useState("");

  const options = columns.map(({ key, title }, index) => ({
    label: title,
    value: key,
    key: index,
  }));

  useEffect(() => {
    const getData = async () => {
      setFetching(true);
      const { status, data } = await getEarlyMaintenanceData();
      if (status === 200) {
        setData(data.data);
      } else {
        message.error(data.error || "Failed to fetch data");
      }
      setFetching(false);
    };
    getData();
  }, []);

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
          {createPlannedWOPopup && (
            <CreatePlannedWOPopup
              visible={createPlannedWOPopup}
              setVisible={setCreatePlannedWOPopup}
              asset={plannedWOAsset}
            />
          )}
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
                  Total Documents:{" "}
                  {fetching ? "..." : <span>{"(" + data?.length + ")"}</span>}
                </p>
              </div>
              <Table
                loading={fetching}
                size={"large"}
                // scroll={{ x: 1100 }}
                onRow={(row) => ({
                  onClick: () => {
                    setPlannedWOAsset(row._id);
                    setCreatePlannedWOPopup(true);
                  },
                  style: { cursor: "pointer" },
                })}
                columns={columns}
                dataSource={data}
                pagination={{
                  total: data?.total,
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
