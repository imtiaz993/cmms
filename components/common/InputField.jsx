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
        style={{
          height: "44px",
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
