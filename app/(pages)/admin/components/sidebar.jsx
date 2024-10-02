import Image from "next/image";
import { DownOutlined } from "@ant-design/icons";
import { sidebarOptions } from "./sidebarOptions";

const Sidebar = () => {
  return (
    <div className="bg-primary min-h-[calc(100dvh-16px-60px)] hidden lg:block lg:w-[300px] rounded-tr-xl p-5  select-none">
      <div className=" text-lg mb-3">Locations</div>
      <div className="ml-3">
        {sidebarOptions.map((option, index) => (
          <div key={index} className="mt-3 flex gap-9">
            <div className="flex items-center">
              <Image
                src="/images/buildings.png"
                alt="Buildings"
                width={100}
                height={100}
                className="w-5 h-5 mr-2"
              />
              <p className="text-sm">{option.title}</p>
            </div>
            <DownOutlined className="!text-secondary cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
