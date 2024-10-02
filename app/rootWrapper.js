"use client";

import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootWrapper({ children }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: { colorBgBase: "#313131" },
        }}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
      <ToastContainer />
    </div>
  );
}
