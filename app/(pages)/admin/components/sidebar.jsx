import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import { sidebarOptions } from "./sidebarOptions";
import { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="bg-primary min-h-[calc(100dvh-16px-60px)] md:w-[300px] rounded-tr-xl p-5 text-white select-none">
      <div
        className="text-white text-xl mb-3"
        onClick={() => setCollapsed(!collapsed)}
      >
        Location
        <DownOutlined
          className="ml-6 !text-secondary"
          rotate={collapsed ? 180 : 0}
        />
      </div>
      <div className="ml-3">
        {collapsed &&
          sidebarOptions.map((option, index) => (
            <div key={index} className="mt-3 flex gap-9">
              <Image
                src="/images/buildings.png"
                alt="Buildings"
                width={100}
                height={100}
                className="w-7 h-7"
              />
              <p>{option.title}</p>
              <DownOutlined className="!text-secondary" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
