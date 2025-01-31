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
      component={FormikDatePicker}
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

export default DatePickerField;
