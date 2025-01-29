import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useState } from "react";
import { message } from "antd";

const validationSchema = Yup.object().shape({
  assetNumber: Yup.string(),
});

const ReadingsFilter = ({ closeDropdown }) => {
  const [isClearing, setIsClearing] = useState(false);
  const handleSubmit = async (values, setSubmitting) => {
    !setSubmitting && setIsClearing(true);
    const status = 404;
    const data = null;
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Readings fetched successfully");
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch Readings");
    }
  };

  return (
    <div className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto shadow-custom">
      <Formik
        initialValues={{
          subCategory: "",
          assetNo: "",
          serialNo: "",
          hoursDaysInService: "",
          hoursDowntime: "",
          daysDowntime: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField name="subCategory" placeholder="Sub Category" />
              <InputField name="assetNo" placeholder="Asset No" />
              <InputField name="serialNo" placeholder="Serial No" />
              <InputField
                name="hoursDaysInService"
                placeholder="Hours/Days In Service"
              />
              <InputField name="hoursDowntime" placeholder="Hours Downtime" />
              <InputField name="daysDowntime" placeholder="Days Downtime" />

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

export default ReadingsFilter;
