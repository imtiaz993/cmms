import Button from "@/components/common/Button";
import { Modal } from "antd";

const PreviewPopup = ({ visible, setVisible }) => {
  return (
    <Modal
      title="Preview"
      open={visible}
      onCancel={() => setVisible(false)}
      width={800}
      footer={
        <div>
          <Button
            className="mr-2"
            onClick={() => setVisible(false)}
            outlined
            size="small"
            text="Cancel"
            fullWidth={false}
          />

          <Button
            className="mr-2"
            onClick={() => setVisible(false)}
            size="small"
            text="Print"
            fullWidth={false}
          />

          <Button
            className=""
            onClick={() => setVisible(false)}
            size="small"
            text="Download"
            fullWidth={false}
          />
        </div>
      }
    >
      <h4 className="">PDF content here...</h4>
    </Modal>
  );
};

export default PreviewPopup;
