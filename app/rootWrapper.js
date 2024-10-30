"use client";

import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootWrapper({ children }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F0BF60",
          },
        }}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
    </div>
  );
}
