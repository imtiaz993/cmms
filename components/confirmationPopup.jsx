import React from "react";
import { Button, Modal } from "antd";

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
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            setVisible(false);
            if (onCancel) onCancel();
          }}
        >
          No
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={() => {
            setVisible(false);
            if (onConfirm) onConfirm();
          }}
        >
          Yes
        </Button>,
      ]}
      maskClosable={false}
      centered
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmationPopup;
