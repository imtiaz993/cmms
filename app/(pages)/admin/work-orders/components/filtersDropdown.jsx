import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import { useState } from "react";
import DatePickerField from "@/components/common/DatePickerField";
import { getFilteredWorkOrders } from "app/services/workOrders";

const validationSchema = Yup.object().shape({
  asset: Yup.string(),
  workOrder: Yup.string(),
  priority: Yup.string(),
  created: Yup.date().nullable(),
  due: Yup.date().nullable(),
  costCenter: Yup.string(),
  cost: Yup.number().nullable(),
});

const WorkOrdersFilter = ({ setWorkOrders, closeDropdown, WOType }) => {
  const [isClearing, setIsClearing] = useState(false);

  const submit = async (values, setSubmitting) => {
    console.log(values);
    !setSubmitting && setIsClearing(true);
    const { status, data } = await getFilteredWorkOrders(values, WOType);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);

    if (status === 200) {
      setWorkOrders(data?.data);
      message.success(data?.message || "Assets fetched successfully");
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch assets");
    }
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
          asset: "",
          workOrder: "",
          priority: "",
          created: null,
          due: null,
          costCenter: "",
          cost: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField name="asset" placeholder="Asset" />
              <InputField name="workOrder" placeholder="Work Order" />
              <SelectField name="priority" placeholder="Priority" />
              <DatePickerField name="created" placeholder="Created" />
              <DatePickerField name="due" placeholder="Due" />
              <SelectField name="costCenter" placeholder="Cost Center" />
              <InputField name="cost" placeholder="Cost" type="number" />

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

export default WorkOrdersFilter;
