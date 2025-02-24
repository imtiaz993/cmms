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
                hoverBorderColor: "#efbf60",
                colorBgElevated: "var(--background-secondary-color)",
                optionSelectedBg: "#efbf60",
                colorTextPlaceholder: "#717171",
              },
              Input: {
                colorPrimary: "#efbf60",
                controlOutline: "#efbf60",
                hoverBorderColor: "#efbf60 !important",
                activeBorderColor: "#efbf60 !important",
                colorTextPlaceholder: "#717171",
              },
              DatePicker: {
                colorPrimary: "#efbf60",
                controlOutline: "#efbf60",
                hoverBorderColor: "#efbf60",
                colorBgElevated: "var(--background-secondary-color)",
                colorTextPlaceholder: "#717171",
              },
              TimePicker: {
                colorPrimary: "#efbf60",
                controlOutline: "#efbf60",
                hoverBorderColor: "#efbf60",
                colorBgElevated: "var(--background-secondary-color)",
                colorTextPlaceholder: "#717171",
              },
              Tabs: {
                colorPrimary: "#efbf60",
                itemHoverColor: "#efbf60",
              },
              Menu: {
                itemSelectedBg: "#efbf60",
              },
              Dropdown: {
                colorBgElevated: "var(--background-secondary-color)",
              },
              Radio: {
                colorPrimary: "#efbf60",
                colorPrimaryHover: "#efbf60",
              },
              Table: {
                colorPrimary: "var(--background-color)",
                headerBg: "var(--background-secondary-color)",
                rowHoverBg: "var(--background-secondary-color)",
                rowSelectedBg: "var(--background-secondary-color)",
                rowSelectedHoverBg: "var(--background-secondary-color)",
              },
              Pagination: {
                colorPrimary: "#efbf60",
                colorPrimaryHover: "#efbf60",
              },
              Modal: {
                colorPrimary: "var(--background-color)",
                colorBgElevated: "var(--background-color)",
                colorPrimaryHover: "#efbf60",
              },
              Calendar: {
                colorPrimary: "#efbf60",
                colorPrimaryHover: "#efbf60",
                itemActiveBg: "var(--background-secondary-color)",
              },
              Checkbox: {
                colorPrimary: "#efbf60",
                colorPrimaryHover: "#efbf60",
              },
            },
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </Provider>
    </div>
  );
}
