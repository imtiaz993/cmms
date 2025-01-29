import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { getFilteredInventory } from "app/services/inventory";
import DatePickerField from "@/components/common/DatePickerField";
import { useDispatch } from "react-redux";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  date: Yup.date().nullable(),
  event: Yup.string(),
  notes: Yup.string(),
});

const EventsFilter = ({ closeDropdown }) => {
  const dispatch = useDispatch();
  const [isClearing, setIsClearing] = useState(false);

  const submit = async (values, setSubmitting) => {
    console.log(values);
    // dispatch(setInventoryLoading(true));
    !setSubmitting && setIsClearing(true);
    // const { status, data } = await getFilteredInventory(values);
    const status = null,
      data = null;
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Events fetched successfully");
      // dispatch(setInventory(data?.data));
      closeDropdown();
    } else {
      // dispatch(setInventoryError(data?.error));
      message.error(data?.message || "Failed to fetch events");
    }
    // dispatch(setInventoryLoading(false));
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
          date: null,
          event: "",
          notes: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <DatePickerField name="date" placeholder="Date" />
              <InputField name="event" placeholder="Event" maxLength={128} />
              <InputField name="notes" placeholder="Notes" maxLength={128} />

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

export default EventsFilter;
