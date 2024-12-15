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
const TimePickerField = ({ name, placeholder, className, style, readOnly }) => (
  <div>
    <Field
      name={name}
      component={FormikTimePicker}
      placeholder={placeholder}
      readOnly={readOnly}
      className={className}
      style={{
        height: "36px",
        width: "100%",
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

export default TimePickerField;
