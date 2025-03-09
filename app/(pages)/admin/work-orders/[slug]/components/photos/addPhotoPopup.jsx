import { Modal, Upload, message } from "antd";
import Button from "@/components/common/Button";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { addImage } from "app/services/workOrders";

const AddPhotoPopup = ({ visible, setVisible, setData }) => {
  const [files, setFiles] = useState([]);
  const { slug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("files", files);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("workOrder", slug);
    // formData.append("assetImages", files[0]);

    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i].originFileObj);
    }

    const { status, data } = await addImage(formData);
    if (status === 200) {
      message.success(data.message);
      setData((prev) => ({
        ...prev,
        workOrderImages: data.data.workOrderImages,
      }));
      setFiles([]);
      setVisible(false);
    } else {
      // message.error(data?.error || "Failed to add photo");
    }
    setIsSubmitting(false);
  };
  return (
    <div>
      <Modal
        title="Add Photo"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={
          <>
            <Button
              key={"cancel"}
              onClick={() => {
                setVisible(false);
              }}
              text="No"
              fullWidth={false}
              outlined
              disabled={isSubmitting}
            />

            <Button
              key={"confirm"}
              onClick={handleSubmit}
              disabled={isSubmitting || files.length === 0}
              isLoading={isSubmitting}
              fullWidth={false}
              text="Add Photo"
            />
          </>
        }
        maskClosable={false}
        // centered
      >
        <div>
          <label className="text-sm mr-3 mt-3">Select images </label>
          <Upload
            beforeUpload={() => {
              // Prevent the auto-upload, just return false
              return false;
            }}
            onChange={(info) => {
              // Get updated file list from Ant Design's info
              const updatedFileList = info.fileList;
              if (info.file.status === "removed") {
                setFiles((prevFiles) =>
                  prevFiles.filter((f) => f.uid !== info.file.uid)
                );
                return;
              }

              // Update files state directly with the updated file list
              setFiles(updatedFileList);
            }}
            // onRemove={(file) => {
            //   // Remove the file from the files array when removed
            //   setFiles(files.filter((f) => f.uid !== file.uid));
            // }}
            // maxCount={}
            fileList={files}
            accept="image/*"
            multiple
          >
            <Button
              className="!bg-green-600 !shadow-custom !border-white"
              // onClick={() => setAddDocPopupVisible(true)}
              fullWidth={false}
              prefix={<UploadOutlined />}
              text="Choose Image"
            />
          </Upload>
        </div>
      </Modal>
    </div>
  );
};

export default AddPhotoPopup;
