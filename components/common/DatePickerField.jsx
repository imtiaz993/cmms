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
      size="large"
    />
  );
};

const DatePickerField = ({
  name,
  placeholder,
  label,
  className,
  style,
  readOnly,
}) => (
  <div>
    {label && (
      <label htmlFor={name} className="text-sm text-[#30343F] ">
        {label}
      </label>
    )}
    <Field
      name={name}
      component={FormikDatePicker}
      placeholder={placeholder}
      readOnly={readOnly}
      className={className}
      style={{
        height: "50px",
        width: "100%",
        fontSize: "16px",
        marginTop: label ? "8px" : 0,
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
