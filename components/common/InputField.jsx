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
    <>
      <Field
        name={name}
        placeholder={placeholder}
        type={type}
        as={Input}
        prefix={prefix}
        className={className}
        readOnly={readOnly}
        style={{ height: "48px", ...style }}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </>
  );
};

export default InputField;
