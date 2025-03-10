import Button from "@/components/common/Button";
import { DatePicker, message, Modal } from "antd";
import { rescheduleWorkOrders } from "app/services/dashboard";
import { useState } from "react";

const MaintenanceReschulePopup = ({
  visible,
  setVisible,
  selectedWorkOrders,
  onSuccess,
}) => {
  const [date, setDate] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const { status, data } = await rescheduleWorkOrders({
      date,
      workOrders: selectedWorkOrders,
    });
    if (status === 200) {
      message.success(data.message || "Rescheduled Successfully");
      setVisible(false);
      onSuccess && onSuccess();
    } else {
      message.error(data.message || "Failed to reschedule");
    }
    setSubmitting(false);
  };
  return (
    <div>
      <Modal
        maskClosable={false}
        width={500}
        title={
          "Reschedule Work Order"
          // <h1 className="text-lg md:text-2xl">
          //   {workOrder?.asset.assetID || "WO-123"}
          // </h1>0
        }
        open={visible}
        onCancel={() => setVisible(false)}
        footer={
          <div>
            <Button
              className="mr-2"
              onClick={() => setVisible(false)}
              outlined
              text="Close"
              fullWidth={false}
            />

            <Button
              className=""
              text="Reschedule"
              fullWidth={false}
              onClick={handleSubmit}
            />
          </div>
        }
      >
        {selectedWorkOrders && selectedWorkOrders.length > 0 ? (
          <div className="">
            <p className="text-sm ">Reschedule Date</p>
            <DatePicker
              name="rescheduleDate"
              placeholder="Reschedule Date"
              size="large"
              style={{
                height: "44px",
                width: "100%",
                fontSize: "16px",
                marginTop: "8px",
              }}
              onChange={(date, dateString) => setDate(dateString)}
            />
            <p>
              All selected work orders {"(" + selectedWorkOrders?.length + ") "}
              will be rescheduled
            </p>
          </div>
        ) : (
          <p className="mt-10 mb-8 text-center"> No work orders selected </p>
        )}
      </Modal>
    </div>
  );
};

export default MaintenanceReschulePopup;
