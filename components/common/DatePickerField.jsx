import { DatePicker } from "antd";
import { ErrorMessage, Field } from "formik";
import dayjs from "dayjs";

const FormikDatePicker = ({ field, form, readOnly, ...props }) => {
  const handleChange = (date, dateString) => {
    form.setFieldValue(field.name, dateString);
  };

  return (
    <DatePicker
      {...props}
      onChange={handleChange}
      value={field.value ? dayjs(field.value) : null}
      disabled={readOnly}
    />
  );
};

const DatePickerField = ({ name, placeholder, className, style, readOnly }) => (
  <div>
    <Field
      name={name}
      component={FormikDatePicker}
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

export default DatePickerField;
