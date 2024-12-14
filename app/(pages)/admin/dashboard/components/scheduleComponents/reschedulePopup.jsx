import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import { WarningFilled } from "@ant-design/icons";
import { Divider, message, Modal, Radio, Table, Typography } from "antd";
import { rescheduleWorkOrders } from "app/services/dashboard";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  workOrders: Yup.array().min(1, "At least one work order is required"),
  date: Yup.date().required("Reschedule Date is required"),
  type: Yup.string().required("Type is Required"),
});

const columns = [
  { title: "id", dataIndex: "id", key: "id" },
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

const ReschedulePopup = ({
  visible,
  setVisible,
  batchEdit,
  setBatchEdit,
  selectedItems,
}) => {
  const { Text } = Typography;

  return (
    <div>
      <Formik
        initialValues={{
          workOrders: selectedItems,
          date: null,
          type: "",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
          const { status, data } = await rescheduleWorkOrders(values);
          if (status === 200) {
            message.success(data.message || "Rescheduled Successfully");
            setVisible(false);
            batchEdit && setBatchEdit(false);
            resetForm();
          } else {
            message.error(data.message || "Something went wrong");
          }
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, isSubmitting, errors, submitForm }) => (
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
                    htmlType="submit"
                    onClick={() => submitForm()}
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
                  dataSource={selectedItems.map((item) => ({
                    id: item,
                  }))}
                  pagination={{
                    total: selectedItems.total,
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
              <ErrorMessage
                name="workOrders"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <Divider />
              <div>
                <strong className="mr-5">Rescheduled Date</strong>
                <DatePickerField name="date" placeholder="Select New Date" />
              </div>

              <div className="mt-5">
                <Radio.Group
                  value={values.type}
                  onChange={(e) => setFieldValue("type", e.target.value)}
                >
                  <Radio value="single">Single Occurrence</Radio>
                  <Radio value="series">Series</Radio>
                </Radio.Group>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {console.log("errors: ", errors)}
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReschedulePopup;
