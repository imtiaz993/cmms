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
              colorPrimary: "var(--background-color)",
              colorBgContainer: "var(--background-color)",
              colorText: "var(--primary-text)",
            },
            components: {
              Button: {
                colorPrimary: "var(--background-color)",
                colorPrimaryHover: "#efbf60",
              },
              Select: {
                colorPrimary: "#efbf60",
                controlOutline: "#efbf60",
              },
              Tabs: {
                colorPrimary: "#efbf60",
                itemHoverColor: "#efbf60",
              },
              Menu: {
                itemSelectedBg: "#efbf60",
              },
              Radio: {
                colorPrimary: "#efbf60",
                colorPrimaryHover: "#efbf60",
              },
              Table: {
                colorBgContainer: "var(--background-color)",
                headerBg : "#1D1C1F"
              }
            },
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </Provider>
    </div>
  );
}
