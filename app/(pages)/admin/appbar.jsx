"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dropdown } from "antd";
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
      className={`bg-primary h-16 flex justify-between items-center px-3 md:px-11`}
    >
      <Link href="/admin/dashboard">
        <Image src="/images/hive-logo.png" alt="logo" width={50} height={50} />
      </Link>
      <div className="flex flex-row">
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={70}
          className="mr-2 md:mr-4"
        />
        <div className="flex items-center">
          <BellOutlined className="mr-2 md:mr-4 text-2xl" />
          <Dropdown
            menu={{
              items: dropdownItems.map((i, index) => ({ ...i, key: index })),
            }}
            arrow
            placement="bottomRight"
            trigger={["click"]}
          >
            <div className="cursor-pointer flex gap-1 md:gap-2 items-center select-none">
              <Image
                src="/images/profile-image.jpg"
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full h-6 w-6 object-top"
              />
              <p className={`dark:text-white text-lg`}>{userName}</p>
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
