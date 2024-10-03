"use client";

import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootWrapper({ children }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgBase: "#313131",
            colorPrimary: "#23CDCD",
          },
        }}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
    </div>
  );
}
