import { ErrorMessage, Field } from "formik";
import { Input } from "antd";

const InputField = ({
  name,
  placeholder,
  type,
  prefix,
  className,
  style,
  readOnly,
  maxLength,
}) => {
  return (
    <div>
      <Field
        name={name}
        placeholder={placeholder}
        type={type}
        as={Input}
        prefix={prefix}
        className={className}
        disabled={readOnly}
        maxLength={maxLength}
        style={{
          height: "36px",
          ...style,
        }}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InputField;
