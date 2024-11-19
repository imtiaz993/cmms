import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import { WarningFilled } from "@ant-design/icons";
import {
  DatePicker,
  Divider,
  message,
  Modal,
  Radio,
  Table,
  Typography,
} from "antd";
import { Field, Form, Formik } from "formik";

const columns = [
  {
    title: "Asset",
    dataIndex: "asset",
    key: "asset",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Required Work",
    dataIndex: "requiredWork",
    key: "requiredWork",
  },
  {
    title: "Scheduled Date",
    dataIndex: "scheduledDate",
    key: "scheduledDate",
  },
];

const data = [
  {
    asset: "1053402443",
    description: "Mud Pump #2 A Blower Motor",
    requiredWork: "30 Day - General - 0.5 hrs",
    scheduledDate: "2022-10-10",
  },
  {
    asset: "1053402443",
    description: "Mud Pump #2 A Blower Motor",
    requiredWork: "30 Day - General - 0.5 hrs",
    scheduledDate: "2022-10-10",
  },
  {
    asset: "1053402443",
    description: "Mud Pump #2 A Blower Motor",
    requiredWork: "30 Day - General - 0.5 hrs",
    scheduledDate: "2022-10-10",
  },
  {
    asset: "1053402443",
    description: "Mud Pump #2 A Blower Motor",
    requiredWork: "30 Day - General - 0.5 hrs",
    scheduledDate: "2022-10-10",
  },
];

const ReschedulePopup = ({ visible, setVisible, batchEdit, setBatchEdit }) => {
  const { Text } = Typography;

  return (
    <div>
      <Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Modal
              // maskClosable={false}
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
                    onClick={() => {
                      message.success("Rescheduled Successfully");
                      setVisible(false);
                      batchEdit && setBatchEdit(false);
                    }}
                    size="small"
                    text="Reschedule"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
              title="Batch Edit"
              width={800}
            >
              {!batchEdit ? (
                <div className="flex flex-wrap md:justify-between gap-3 md:gap-5">
                  <div className="max-w-32">
                    <p>Work Required </p>
                    <Text ellipsis={{ tooltip: "30 Day - General - 0.5 hrs" }}>
                      30 Day - General - 0.5 hrs
                    </Text>
                  </div>
                  <div className="max-w-32">
                    <p>Asset # </p>
                    <Text ellipsis={{ tooltip: "1053402443" }}>1053402443</Text>
                  </div>
                  <div className="max-w-32">
                    <p>Asset Description </p>
                    <Text ellipsis={{ tooltip: "Mud Pump #2 A Blower Motor" }}>
                      Mud Pump #2 A Blower Motor
                    </Text>
                  </div>
                  <div className="max-w-32">
                    <p>Task To </p>
                    <Text ellipsis={{ tooltip: "Motorman" }}>Motorman</Text>
                  </div>
                  <div className="max-w-32">
                    <p>Cost Center </p>
                    <Text ellipsis={{ tooltip: "30 Day - General - 0.5 hrs" }}>
                      Rig 29 - Electrical - Systems
                    </Text>
                  </div>
                  <div className="max-w-32">
                    <p>Priority </p>
                    <Text ellipsis={{ tooltip: "30 Day - General - 0.5 hrs" }}>
                      <WarningFilled /> Critical
                    </Text>
                  </div>
                </div>
              ) : (
                <Table
                  loading={false}
                  size={"large"}
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    total: data.total,
                    current: 1,
                    pageSize: 5,
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
              )}
              <Divider />
              <div>
                <strong className="mr-5">Rescheduled Date</strong>
                <DatePickerField
                  name="date"
                  placeholder="Select New Date"
                />
              </div>

              <div className="mt-5">
                <Radio.Group
                  value={values.series}
                  onChange={(e) => setFieldValue("series", e.target.value)}
                >
                  <Radio value="single">Single Occurrence</Radio>
                  <Radio value="series">Series</Radio>
                </Radio.Group>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReschedulePopup;
