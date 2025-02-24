import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import SelectField from "@/components/common/SelectField";
import { getSites } from "app/services/setUp/sites";

const validationSchema = Yup.object().shape({
  site: Yup.string(),
});

const FilterDropdown = ({
  closeDropdown,
  setLoading,
  setLocations,
  handleFetchFilteredSystems,
  sites,
}) => {
  const [isClearing, setIsClearing] = useState(false);

  const submit = async (values, setSubmitting) => {
    console.log(values);
    // setLoading(true);
    // !setSubmitting && setIsClearing(true);
    // const { status, data } = await getFilteredInventory(values);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    // if (status === 200) {
    //   message.success(data?.message || "Fetched successfully");
    closeDropdown();
    // } else {
    //   message.error(data?.message || "Failed to fetch");
    // }
    // setLoading(false);
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
        initialValues={{ site: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          {
            setSubmitting(true);
            handleFetchFilteredSystems(values);
            setSubmitting(false);
            closeDropdown();
          }
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 w-full md:w-60 gap-4">
              <SelectField
                name="site"
                placeholder="Site"
                options={sites.map((site) => ({
                  value: site._id,
                  label: site.site,
                }))}
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
                      handleFetchFilteredSystems({});
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
