import { Input } from "antd";
import { Field, ErrorMessage } from "formik";

const { TextArea } = Input;

const TextAreaField = ({
  name,
  placeholder,
  label,
  maxLength,
  className,
  style,
  readOnly,
  labelOnTop,
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
          className={`text-sm ${
            !labelOnTop && "sm:text-right sm:min-w-[115px]"
          }`}
        >
          {label}
        </label>
      )}
      <div className="w-full">
        <Field name={name}>
          {({ field, form }) => (
            <div className="relative w-full">
              <TextArea
                {...field}
                placeholder={placeholder}
                maxLength={maxLength}
                readOnly={readOnly}
                className={`${className} !border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F] resize-none ${
                  !labelOnTop && label && "mt-2 sm:mt-0 "
                }`}
                style={{
                  width: "100%",
                  marginTop: labelOnTop ? "8px" : 0,
                  fontSize: "16px",
                  ...style,
                }}
              />
              <div className="flex justify-between">
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-500 text-sm mt-1 w-full"
                />
                {maxLength ? (
                  <div className="text-right text-gray-500 text-xs mt-1 w-full">
                    {field.value?.length || 0}/{maxLength}
                  </div>
                ) : (
                  <div className="h-4nnnn"></div>
                )}
              </div>
            </div>
          )}
        </Field>
      </div>
    </div>
  );
};

export default TextAreaField;
