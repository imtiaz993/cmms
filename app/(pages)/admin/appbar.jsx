"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  BellOutlined,
} from "@ant-design/icons";
import DarkModeToggle from "react-dark-mode-toggle";
import Image from "next/image";
import { getUser } from "@/utils/index";
import { Logo } from "@/icons/index";

const Appbar = ({ setOpenSidebar, isDarkMode, setIsDarkMode }) => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  // Fetch user data from localStorage on the client
  useEffect(() => {
    const user = getUser();
    setUserName(user?.name);
  }, []);

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
      className={`bg-primary h-16 flex justify-between items-center px-3 md:px-11 shadow-custom`}
    >
      <Link href="/admin/dashboard" className="">
        {/* <Image src="/images/hive-logo.png" alt="logo" width={50} height={50} /> */}
        {/* <h1 className="text-2xl md:text-3xl headerLogo text-[#0F0E13] dark:text-[#D8A444]">
          Hive Solutions
        </h1> */}
        <Image
          src={`/images/logo-with-text-${isDarkMode ? "dark" : "light"}.png`}
          alt="logo"
          width={1000}
          height={1000}
          className="h-full w-auto"
        />
      </Link>
      <div className="flex flex-row">
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={70}
          className="mr-2 md:mr-4"
        />
        <div className="flex items-center">
          <span>
            <BellOutlined className="mr-2 md:mr-4 text-2xl" />
          </span>
          <Dropdown
            menu={{
              items: dropdownItems.map((i, index) => ({ ...i, key: index })),
            }}
            arrow
            placement="bottomRight"
            trigger={["click"]}
          >
            <div className="cursor-pointer flex gap-1 md:gap-2 items-center select-none">
              <Avatar icon={<UserOutlined />} />
              <p className={`dark:text-white text-lg hidden md:block`}>
                {userName}
              </p>
              <span>
                <DownOutlined style={{ fontSize: "10px" }} />
              </span>
            </div>
          </Dropdown>
          <div className="ml-3 lg:hidden text-[--primary-text]">
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
