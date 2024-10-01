import React from "react";
import { Button as AntButton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Button = ({
  text = "",
  htmlType = "button",
  disabled = false,
  isLoading = false,
  className,
  style,
  fullWidth = true,
}) => {
  return (
    <AntButton
      type={"primary"}
      htmlType={htmlType}
      disabled={disabled}
      className={`${fullWidth ? "w-full" : ""} ${className} `}
      style={{
        background: "#23CDCD",
        opacity: disabled ? "0.7" : "",
        height: "48px",
        fontSize: "16px",
        fontWeight: "500",
        ...style,
      }}
    >
      {isLoading ? (
        <Spin
          spinning={true}
          indicator={<LoadingOutlined spin style={{ color: "white" }} />}
        />
      ) : (
        text
      )}
    </AntButton>
  );
};

export default Button;
