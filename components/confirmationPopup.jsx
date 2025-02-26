import React from "react";
import { Modal } from "antd";
import Button from "./common/Button";

const ConfirmationPopup = ({
  visible,
  setVisible,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title={title || "Confirmation"}
      open={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button
          key={"cancel"}
          onClick={() => {
            setVisible(false);
            if (onCancel) onCancel();
          }}
          text="No"
          fullWidth={false}
          outlined
        />,
        <Button
          key={"confirm"}
          onClick={() => {
            setVisible(false);
            if (onConfirm) onConfirm();
          }}
          fullWidth={false}
          text="Yes"
        />,
      ]}
      maskClosable={false}
      centered
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmationPopup;
