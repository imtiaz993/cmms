"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown, Menu, Spin } from "antd";
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
import { getNotifications } from "app/services/notifications";

const Appbar = ({ setOpenSidebar, isDarkMode, setIsDarkMode }) => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user data from localStorage on the client
  useEffect(() => {
    const user = getUser();
    setUserName(user?.name);
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    const { status, data } = await getNotifications();
    if (status == 200) {
      setLoading(false);
      setNotifications(data.data);
    } else {
      setLoading(false);
    }
  };
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

  const notificationMenu = (
    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        width: "300px",
      }}
      className="bg-bg_secondary p-4 rounded-lg"
    >
      {loading ? (
        <div key="loading">
          <div className="flex justify-center w-full py-5">
            <Spin />
          </div>
        </div>
      ) : notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className="mb-2">
            <div>
              <div className="flex justify-between items-center">
                <p>{notification.event}</p>
                <span className="text-xs text-[#888]">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
              <span className="text-xs text-[#888]">
                {notification.message}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div key="empty">No new notifications</div>
      )}
    </div>
  );

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
          <Dropdown
            overlay={notificationMenu}
            trigger={["click"]}
            onOpenChange={(open) => {
              if (open) {
                fetchNotifications();
              }
            }}
            placement="bottomRight"
          >
            <span className="cursor-pointer">
              <BellOutlined className="mr-2 md:mr-4 text-2xl" />
            </span>
          </Dropdown>
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
