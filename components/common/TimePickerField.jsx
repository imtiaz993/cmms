import React from "react";
import { TimePicker } from "antd";
import { Field, ErrorMessage } from "formik";
import dayjs from "dayjs";

// Custom Formik TimePicker Component
const FormikTimePicker = ({ field, form, readOnly, ...props }) => {
  const handleChange = (time, timeString) => {
    form.setFieldValue(field.name, timeString);
  };

  const getValue = () => {
    if (field && field.value) {
      const parsedTime = dayjs(field.value, "HH:mm", true);
      return parsedTime.isValid() ? parsedTime : null;
    }
    return null;
  };

  return (
    <TimePicker
      {...props}
      onChange={handleChange}
      value={getValue()}
      disabled={readOnly}
      format="HH:mm"
    />
  );
};

// Formik TimePicker Field with Error Handling
const TimePickerField = ({
  name,
  placeholder,
  label,
  className,
  style,
  readOnly,
  labelOnTop,
}) => (
  <div
    className={`w-full ${!labelOnTop && label && "sm:flex items-center gap-3"}`}
  >
    {label && (
      <label
        htmlFor={name}
        className={`text-sm text-[#30343F] ${
          !labelOnTop && "sm:text-right sm:min-w-[115px]"
        }`}
      >
        {label}
      </label>
    )}
    <div className="w-full">
      <Field
        name={name}
        component={FormikTimePicker}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`${!labelOnTop && label && "mt-2 sm:mt-0 "}` + className}
        style={{
          height: "44px",
          width: "100%",
          fontSize: "16px",
          marginTop: labelOnTop ? "8px" : 0,
          ...style,
        }}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  </div>
);

export default TimePickerField;
