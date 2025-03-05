import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import { useEffect, useState } from "react";
import DatePickerField from "@/components/common/DatePickerField";
import { getFilteredWorkOrders } from "app/services/workOrders";
import { getCategories } from "app/services/setUp/categories";

const validationSchema = Yup.object().shape({
  asset: Yup.string(),
  workOrder: Yup.string(),
  priority: Yup.string(),
  created: Yup.date().nullable(),
  due: Yup.date().nullable(),
  costCenter: Yup.string(),
  cost: Yup.number().nullable(),
});

const WorkOrdersFilter = ({
  setWorkOrders,
  closeDropdown,
  WOType,
  WOStatus,
}) => {
  const [isClearing, setIsClearing] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleFetchCategories = async () => {
      const { status, data } = await getCategories();
      if (status === 200) {
        setCategories(data.data);
      } else {
        message.error(data.error);
      }
    };
    handleFetchCategories();
  }, []);

  const submit = async (values, setSubmitting) => {
    console.log(values);
    !setSubmitting && setIsClearing(true);
    const { status, data } = await getFilteredWorkOrders(
      values,
      WOType,
      WOStatus
    );
    setSubmitting ? setSubmitting(false) : setIsClearing(false);

    if (status === 200) {
      setWorkOrders(data?.data);
      message.success(data?.message || "Assets fetched successfully");
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch assets");
    }
  };

  const UnplannedFields = () => {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InputField name="asset" placeholder="Asset" />
        <DatePickerField name="dueDate" placeholder="Completion Date" />
        <SelectField
          name="category"
          placeholder="Category"
          options={categories.map((i) => ({
            label: i.category,
            value: i._id,
          }))}
        />
        <DatePickerField name="startDate" placeholder="Start Date" />
        <SelectField
          name="criticality"
          placeholder="Criticality"
          options={[
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
          ]}
        />
        <DatePickerField name="schedule" placeholder="Schedule" />
        <InputField name="lastPerformed" placeholder="Last Performed" />
      </div>
    );
  };

  const PlannedFields = () => {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InputField name="asset" placeholder="Asset" />
        <InputField name="issue" placeholder="Issue #" />
        <InputField name="description" placeholder="Description" />
        <InputField name="technician" placeholder="Technician" />
        <DatePickerField name="createdDate" placeholder="CreatedDate" />
      </div>
    );
  };

  // Dynamically set initialValues based on WOType
  const initialValues = WOType === "planned"
    ? { asset: "", issue: "", description: "", technician: "", createdDate: "" }
    : { asset: "", dueDate: "", category: "", startDate: "", criticality: "", schedule: "", lastPerformed: "" };

  return (
    <div
      className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto"
      style={{
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
        enableReinitialize // Ensures Formik reinitializes when WOType changes
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            {WOType === "planned" ? <UnplannedFields /> : <PlannedFields />}
            <div className="flex justify-end gap-4 mt-4">
              <div>
                <Button
                  outlined
                  size="small"
                  text="Clear Filter"
                  disabled={isSubmitting || isClearing}
                  isLoading={isClearing}
                  onClick={() => {
                    resetForm(); // Reset form fields
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WorkOrdersFilter;
