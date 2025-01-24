import { Select } from "antd";
import { ErrorMessage, Field } from "formik";

const SelectField = ({
  name,
  placeholder,
  label,
  prefix,
  className,
  style,
  readOnly,
  options,
}) => {
  const FormikSelect = ({ field, form, options, ...props }) => {
    const handleChange = (value) => {
      form.setFieldValue(field.name, value);
    };

    return (
      <Select
        {...props}
        value={field.value || undefined}
        onChange={handleChange}
        onBlur={() => form.setFieldTouched(field.name, true)}
        options={options}
        disabled={readOnly} // Handle read-only state
        size="large"
      />
    );
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-sm text-[#30343F] ">
          {label}
        </label>
      )}
      <Field
        component={FormikSelect}
        options={options}
        name={name}
        placeholder={placeholder}
        prefix={prefix}
        className={className}
        disabled={readOnly} // Handle the read-only behavior
        style={{
          height: "50px",
          width: "100%",
          marginTop: "8px",
          ...style,
        }}
      />

      <ErrorMessage
        name={name} // Dynamically handle error messages
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default SelectField;
