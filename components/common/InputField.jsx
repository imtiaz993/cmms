import { ErrorMessage, Field } from "formik";
import { Input } from "antd";

const InputField = ({
  name,
  placeholder,
  label,
  type,
  prefix,
  className,
  style,
  readOnly,
  maxLength,
  suffix,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-sm text-[#30343F] ">
          {label}
        </label>
      )}
      <Field
        name={name}
        placeholder={placeholder}
        type={type}
        as={Input}
        prefix={prefix}
        suffix={suffix}
        className={className}
        disabled={readOnly}
        maxLength={maxLength}
        style={{
          height: "50px",
          width: "100%",
          marginTop: label ? "8px" : "0px",
          fontSize: "16px",
          ...style,
        }}
        extra={prefix}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm md:text-base mt-1"
      />
    </div>
  );
};

export default InputField;
