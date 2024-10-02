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
      className={`${fullWidth ? "w-full" : ""} ${className} `}
      style={{
        background: outlined ? "transparent" : "#23CDCD",
        borderColor: outlined ? "#FFFFFF" : "#23CDCD",
        opacity: disabled ? "0.7" : "",
        height: "40px",
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
        <div className="flex items-center">
          {prefix ? <div className="mr-1">{prefix}</div> : ""}
          {text}
        </div>
      )}
    </AntButton>
  );
};

export default Button;
