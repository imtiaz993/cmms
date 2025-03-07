import Button from "@/components/common/Button";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import Image from "next/image";
import { useState } from "react";
import AddPhotoPopup from "./addPhotoPopup";
import ImagePreview from "@/components/imagePreviewPopup";
import Link from "next/link";

const Photos = ({ photos, setData }) => {
  const [addPhotoPopup, setAddPhotoPopup] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);

  const handleExport = async () => {
    message.success("Export Failed ");
    // const { status, data } = await exportEvents();
    // if (status === 200) {
    //   window.open(data.data);
    // } else {
    //   message.error(data.error);
    // }
  };
  return (
    <div>
      <ImagePreview
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
      <AddPhotoPopup
        visible={addPhotoPopup}
        setVisible={setAddPhotoPopup}
        setData={setData}
      />
      {/* actionBar */}
      <div className="px-3 lg:px-5 pb-4 mt-1">
        <div className="grid grid-cols-2 md:flex justify-end gap-3 items-center text-right">
          <Button
            text="Export"
            outlined
            fullWidth={false}
            onClick={handleExport}
            style={{ padding: "0px 15px", height: "44px" }}
            prefix={<ExportOutlined />}
          />
          <Button
            text="Add Photo"
            fullWidth={false}
            style={{ padding: "0px 20px", height: "44px" }}
            prefix={<PlusOutlined />}
            onClick={() => setAddPhotoPopup(true)}
          />
        </div>
      </div>

      {/* Photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-5">
        {photos && photos.length > 0 ? (
          photos.map((photo, index) => (
            <div className="" key={index}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_S3_BASE_URL + photo ||
                  "/images/profile-image.jpg"
                }
                alt="placeholder"
                width={200}
                height={200}
                className="h-36 w-full object-cover bg-gray-700 rounded-lg shadow-custom cursor-pointer"
                onClick={() =>
                  setPreviewImage(process.env.NEXT_PUBLIC_S3_BASE_URL + photo)
                }
              />
              <p className="mt-5 text-sm font-medium">
                <Link
                  href={process.env.NEXT_PUBLIC_S3_BASE_URL + photo}
                  target="_blank"
                  className="text-tertiary"
                >
                  {photo || "IMG #1.JPG"}
                </Link>
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 2xl:col-span-6">
            <p className="text-sm font-medium text-center mt-10 mb-20">
              No Photos Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
