import { Form, Formik } from "formik";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import { useState } from "react";
import { message } from "antd";
import { getFilteredManHours } from "app/services/workOrders";

const ManHoursFilter = ({
  closeDropdown,
  setData,
  superUsers,
  asset_id,
  workOrderId,
}) => {
  const [isClearing, setIsClearing] = useState(false);
  const handleSubmit = async (values, setSubmitting) => {
    !setSubmitting && setIsClearing(true);
    const { status, data } = await getFilteredManHours(values);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Man Hours fetched successfully");
      asset_id
        ? setData((prev) => {
            return {
              ...prev,
              dashboard: { ...prev.dashboard, manHours: data?.data },
            };
          })
        : workOrderId &&
          setData((prev) => {
            return {
              ...prev,
              manHours: data?.data,
            };
          });
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch Man Hours");
    }
  };

  return (
    <div className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto shadow-custom">
      <Formik
        initialValues={{
          asset: asset_id ?? "",
          performedBy: "",
          fromHours: "",
          toHours: "",
          addedBy: "",
          workOrder: workOrderId ?? "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField
                name="fromHours"
                placeholder="Man Hours Range From"
                type="number"
              />
              <InputField
                name="toHours"
                placeholder="Man Hours Range To"
                type="number"
              />
              <SelectField
                name="performedBy"
                placeholder="Performed By"
                options={superUsers.map((i) => ({
                  label: i.name,
                  value: i._id,
                }))}
              />
              <SelectField
                name="addedBy"
                placeholder="Added By"
                options={superUsers.map((i) => ({
                  label: i.name,
                  value: i._id,
                }))}
              />

              <div className="sm:col-span-2 flex justify-end gap-4">
                <div>
                  <Button
                    outlined
                    size="small"
                    text="Clear Filter"
                    disabled={isSubmitting || isClearing}
                    isLoading={isClearing}
                    onClick={() => {
                      resetForm();
                      handleSubmit({});
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

export default ManHoursFilter;
