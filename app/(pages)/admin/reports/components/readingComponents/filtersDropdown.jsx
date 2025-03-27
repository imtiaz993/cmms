import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import SelectField from "@/components/common/SelectField";
import { getFilteredReadings } from "app/services/reports";

const validationSchema = Yup.object().shape({
  assetNumber: Yup.string(),
});

const ReadingsFilter = ({ closeDropdown, setReadings }) => {
  const [isClearing, setIsClearing] = useState(false);
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);

  const handleSubmit = async (values, setSubmitting) => {
    !setSubmitting && setIsClearing(true);
    const { status, data } = await getFilteredReadings(values);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Readings fetched successfully");
      setReadings(data?.data);
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch Readings");
    }
  };

  return (
    <div className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto shadow-custom">
      <Formik
        initialValues={{
          site: "",
          system: "",
          assetID: "",
          fromActiveHours: "",
          toActiveHours: "",
          fromInActiveHours: "",
          toInActiveHours: "",
          serialNumber: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ values, isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectField
                name="site"
                placeholder="Site"
                className="!w-full"
                options={locations.map((i) => ({
                  label: i.site,
                  value: i._id,
                }))}
              />
              <SelectField
                name="system"
                placeholder="System"
                options={systems?.map((i) => ({
                  label: i.system,
                  value: i._id,
                }))}
              />
              <InputField name="assetID" placeholder="Asset ID" />
              <InputField name="serialNumber" placeholder="Serial Number" />
              <InputField
                name="fromActiveHours"
                placeholder="Hours in Service From"
                type="number"
              />
              <InputField
                name="toActiveHours"
                placeholder="Hours in Service To"
                type="number"
              />
              <InputField
                name="fromInActiveHours"
                placeholder="Hours in Downtime From"
                type="number"
              />
              <InputField
                name="toInActiveHours"
                placeholder="Hours in Downtime To"
                type="number"
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

export default ReadingsFilter;
