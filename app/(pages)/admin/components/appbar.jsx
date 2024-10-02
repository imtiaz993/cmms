import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dropdown } from "antd";
import {
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Appbar = ({ openSidebar, setOpenSidebar }) => {
  const router = useRouter();
  const dropdownItems = [
    {
      key: "1",
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
      key: "2",
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
    <div className="bg-primary h-[60px] flex justify-between items-center px-3 md:px-5 ">
      <Link href="/admin/dashboard">
        <h1 className="text-3xl font-bold">LOGO</h1>
      </Link>
      <div className="flex items-center">
        <Dropdown
          menu={{ items: dropdownItems }}
          arrow
          placement="bottomRight"
          trigger="click"
        >
          <div className="cursor-pointer flex items-center select-none">
            <p className="mr-1">Imtiaz Hussain</p>
            <DownOutlined style={{ fontSize: "10px" }} />
          </div>
        </Dropdown>
        <div className="ml-2 lg:hidden">
          <MenuOutlined
            style={{ fontSize: "20px" }}
            onClick={() => {
              setOpenSidebar(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
