"use client";

import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function RootWrapper({ children }) {
  return (
    <div>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#F0BF60",
            },
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </Provider>
    </div>
  );
}
