import { Input } from "antd";
import { Field, ErrorMessage } from "formik";

const { TextArea } = Input;

const TextAreaField = ({
  name,
  placeholder,
  maxLength,
  className,
  style,
  readOnly,
}) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form }) => (
          <div className="relative">
            <TextArea
              {...field}
              placeholder={placeholder}
              maxLength={maxLength}
              readOnly={readOnly}
              className={`${className} !border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F] resize-none`}
              style={{ width: "100%", ...style }}
            />
            <div className="flex justify-between">
              <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-sm mt-1 w-full mb-3"
              />
              {maxLength ? (
                <div className="text-right text-gray-500 text-xs mt-1 w-full">
                  {field.value?.length || 0}/{maxLength}
                </div>
              ): <div className="h-4"></div>}
            </div>
          </div>
        )}
      </Field>
    </div>
  );
};

export default TextAreaField;
