import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { DatePicker, Input, Modal, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Field, Form, Formik } from "formik";

const AddManHoursPopup = ({ visible, setVisible }) => {
  return (
    <div>
      <Formik
        initialValues={{ type: "manHours" }}
        // validationSchema={{}}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setVisible(false);
        }}
      >
        {({ values, isSubmitting, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              maskClosable={false}
              title="Add Man Hours"
              open={visible}
              onCancel={() => setVisible(false)}
              footer={
                <div className="mt-7">
                  <Button
                    className="mr-2"
                    onClick={() => setVisible(false)}
                    outlined
                    size="small"
                    text="Cancel"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />

                  <Button
                    className=""
                    onClick={() => setVisible(false)}
                    size="small"
                    text="Add"
                    fullWidth={false}
                    disabled={isSubmitting}
                  />
                </div>
              }
              width={800}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <Field name="type">
                  {({ field, form }) => (
                    <Select
                      {...field}
                      style={{ height: "36px" }}
                      value={field.value} // bind Formik's value to the Select
                      onChange={(value) =>
                        form.setFieldValue(field.name, value)
                      } // handle Formik's onChange
                      options={[
                        { value: "manHours", label: "Man Hours" },
                        {
                          value: "clockInClockOut",
                          label: "Clock In/Clock Out",
                        },
                      ]}
                      placeholder="type"
                      className="w-full"
                    />
                  )}
                </Field>
                {values.type === "manHours" && (
                  <InputField
                    name="manHours"
                    placeholder="Man Hours"
                    className="w-full"
                  />
                )}
                {console.log("values", values)}
                {values.type === "clockInClockOut" && (
                  <div className="grid md:grid-cols-2 gap-4 md:col-span-2">
                    <DatePickerField name="clockIn" placeholder="Clock In" />
                    <Field
                      as={TimePicker}
                      name="clockInTime"
                      placeholder="Time"
                      className="w-full"
                      style={{ height: "36px" }}
                    />
                  </div>
                )}
                {values.type === "clockInClockOut" && (
                  <div className="grid md:grid-cols-2 gap-4 md:col-span-2">
                    <DatePickerField name="clockOut" placeholder="Clock Out" />
                    <Field
                      as={TimePicker}
                      name="clockOutTime"
                      placeholder="Time"
                      className="w-full"
                      style={{ height: "36px" }}
                    />
                  </div>
                )}
                <div className="hidden md:block"></div>
                <InputField name="performedBy" placeholder="Performed by" />
                <InputField
                  name="companyDoingWork"
                  placeholder="Company Doing Work"
                />
                <SelectField
                  name="rate"
                  placeholder="Rate"
                  options={[
                    { label: "Normal", value: "normal" },
                    { label: "Double", value: "double" },
                    { label: "Overtime", value: "overtime" },
                  ]}
                />
                <div className="col-span-3 -mb-4">
                  <TextAreaField
                    name="comment"
                    placeholder="Add Comment"
                    maxLength={150}
                  />
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddManHoursPopup;
