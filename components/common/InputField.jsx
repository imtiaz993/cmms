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
  labelOnTop,
  labelWidth,
  required,
}) => {
  return (
    <div
      className={`w-full ${
        !labelOnTop && label && "sm:flex items-center gap-3"
      }`}
    >
      {label && (
        <label
          htmlFor={name}
          className={
            `text-sm text-[#30343F] flex gap-1 items-center ${
              !labelOnTop && !labelWidth && "sm:justify-end sm:min-w-[115px] "
            }` + labelWidth
          }
        >
          {label} {required && <span className="text-red-600 text-xl">*</span>}
        </label>
      )}
      <div className="w-full">
        <Field
          name={name}
          placeholder={placeholder}
          type={type}
          as={Input}
          prefix={prefix}
          suffix={suffix}
          className={`${!labelOnTop && label && "mt-2 sm:mt-0 "}` + className}
          disabled={readOnly}
          maxLength={maxLength}
          style={{
            height: "44px",
            width: "100%",
            marginTop: labelOnTop ? "8px" : "0px",
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
    </div>
  );
};

export default InputField;
