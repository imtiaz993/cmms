import Button from "@/components/common/Button";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import Image from "next/image";
import { useState } from "react";
import AddPhotoPopup from "./addPhotoPopup";

const Photos = ({ photos, setData }) => {
  const [addPhotoPopup, setAddPhotoPopup] = useState(false);

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
        {photos &&
          photos.map((photo, index) => (
            <div className="" key={index}>
              <Image
                src={
                  env.NEXT_PUBLIC_APP_URL + "/" + photo ||
                  "/images/profile-image.jpg"
                }
                alt="placeholder"
                width={200}
                height={200}
                className="h-36 w-full object-cover bg-gray-700 rounded-lg shadow-custom"
              />
              <p className="mt-5 text-sm font-medium">
                {photos?.name || "IMG #1.JPG"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
