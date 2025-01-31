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
  labelOnTop,
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
    <div
      className={`w-full ${
        !labelOnTop && label && "sm:flex items-center gap-3"
      }`}
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
          component={FormikSelect}
          options={options}
          name={name}
          placeholder={placeholder}
          prefix={prefix}
          className={`${!labelOnTop && label && "mt-2 sm:mt-0 "}` + className}
          disabled={readOnly} // Handle the read-only behavior
          style={{
            height: "44px",
            width: "100%",
            marginTop: labelOnTop ? "8px" : 0,
            ...style,
          }}
        />

        <ErrorMessage
          name={name} // Dynamically handle error messages
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
};

export default SelectField;
