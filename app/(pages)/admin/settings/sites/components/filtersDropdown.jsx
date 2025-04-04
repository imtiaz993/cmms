import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useState } from "react";
import SelectField from "@/components/common/SelectField";
import { filterSites } from "app/services/setUp/sites";
import { countries } from "@/constants/countries";

const validationSchema = Yup.object().shape({
  siteName: Yup.string(),
});

const FilterDropdown = ({ closeDropdown, setLoading, setSites }) => {
  const [isClearing, setIsClearing] = useState(false);

  const submit = async (values, setSubmitting) => {
    setLoading(true);
    !setSubmitting && setIsClearing(true);
    const { status, data } = await filterSites(values);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      setSites(data.data);
      message.success(data?.message || "Fetched successfully");
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch");
    }
    setLoading(false);
  };

  return (
    <div
      className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto"
      style={{
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Formik
        initialValues={{
          site: "",
          address: "",
          apartment: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField name="site" placeholder="Site Name" />
              <InputField name="address" placeholder="Address" />
              <InputField name="apartment" placeholder="Apt./Suite #" />
              <InputField name="city" placeholder="City" />
              <InputField name="state" placeholder="State" />
              <InputField name="zip" placeholder="Zip Code" />
              <SelectField
                name="country"
                placeholder="Select Country"
                options={countries.map((country) => {
                  return { value: country.label, label: country.label };
                })}
              />

              <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-4">
                <div>
                  <Button
                    outlined
                    size="small"
                    text="Clear Filter"
                    disabled={isSubmitting || isClearing}
                    isLoading={isClearing}
                    onClick={() => {
                      resetForm();
                      submit({});
                    }}
                    style={{ width: "fit-content" }}
                    className="mr-2"
                  />
                  <Button
                    size="small"
                    text="Filter"
                    htmlType="submit"
                    disabled={isSubmitting || isClearing}
                    isLoading={isSubmitting}
                    style={{ width: "fit-content" }}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FilterDropdown;
