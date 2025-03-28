import { Button as AntButton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Button = ({
  text = "",
  htmlType = "button",
  onClick = () => {},
  disabled = false,
  isLoading = false,
  className,
  style,
  fullWidth = true,
  outlined = false,
  prefix,
}) => {
  return (
    <AntButton
      type={"primary"}
      htmlType={htmlType}
      disabled={disabled}
      onClick={onClick}
      className={`${fullWidth ? "w-full" : ""} ${className} ${
        outlined && "!shadow-none"
      }`}
      style={{
        background: outlined ? "var(--background-secondary-color)" : "#EFBF60",
        color: outlined ? "var(--tertiary-text)" : "white",
        border: outlined ? "1px solid #D6D6D6" : "",
        borderColor: outlined ? "var(--border-color)" : "#EFBF60",
        opacity: disabled ? "0.7" : "",
        height: "44px",
        fontWeight: "500",
        minWidth: "80px",
        ...style,
      }}
    >
      {isLoading ? (
        <Spin spinning={true} indicator={<LoadingOutlined spin />} />
      ) : (
        <div className="flex items-center">
          {prefix ? <div className="mr-1">{prefix}</div> : ""}
          {text}
        </div>
      )}
    </AntButton>
  );
};

export default Button;
