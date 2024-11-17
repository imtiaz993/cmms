"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dropdown } from "antd";
import {
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import DarkModeToggle from "react-dark-mode-toggle";
import { getUser } from "@/utils/index";

const Appbar = ({ setOpenSidebar, isDarkMode, setIsDarkMode }) => {
  const router = useRouter();
  const dropdownItems = [
    {
      label: (
        <div
          onClick={() => {
            router.push("/admin/profile");
          }}
        >
          <UserOutlined style={{ marginRight: "4px" }} />
          Profile
        </div>
      ),
    },
    {
      label: (
        <div
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.push("/login");
          }}
        >
          <LogoutOutlined style={{ marginRight: "4px" }} />
          Logout
        </div>
      ),
    },
  ];

  return (
    <div
      className={`bg-primary h-[60px] flex justify-between items-center px-3 md:px-5`}
    >
      <Link href="/admin/dashboard">
        <h1 className={`dark:text-white text-3xl font-bold`}>LOGO</h1>
      </Link>
      <div className="flex flex-row">
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={70}
          className="mx-2"
        />
        <div className="flex items-center">
          <Dropdown
            menu={{
              items: dropdownItems.map((i, index) => ({ ...i, key: index })),
            }}
            arrow
            placement="bottomRight"
            trigger="click"
          >
            <div className="cursor-pointer flex items-center select-none">
              <p className={`dark:text-white mr-1`}>{getUser()?.name}</p>
              <DownOutlined style={{ fontSize: "10px" }} />
            </div>
          </Dropdown>
          <div className="ml-3 lg:hidden">
            <MenuOutlined
              style={{ fontSize: "20px" }}
              onClick={() => {
                setOpenSidebar(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
