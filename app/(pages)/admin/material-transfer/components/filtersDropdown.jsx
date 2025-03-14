import { useState } from "react";
import { Form, Formik } from "formik";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import DatePickerField from "@/components/common/DatePickerField";
import { getFilteredMT } from "app/services/materialTransfer";
import { useSelector } from "react-redux";
import SelectField from "@/components/common/SelectField";
import { useSearchParams } from "next/navigation";

const MaterialTransferFilter = ({
  setMaterialTransferData,
  closeDropdown,
  superUsers,
  assetId,
  inventoryId,
}) => {
  0;
  const [isClearing, setIsClearing] = useState(false);
  const locations = useSelector((state) => state.location.location);
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const submit = async (values, setSubmitting) => {
    console.log(values);
    !setSubmitting && setIsClearing(true);
    const { status, data } = await getFilteredMT(values);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Assets fetched successfully");
      setMaterialTransferData(data?.data);
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
          createdDateRange: "",
          // materialTransferType: "",
          asset: assetId ? assetId : "",
          inventory: inventoryId ? inventoryId : "",
          origination: "",
          destination: "",
          createdBy: "",
          // Transporter: "",
          site: activeLocation,
          system: activeSystem,
        }}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        {({ initialValues, isSubmitting, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <DatePickerField
                name="createdDateRange"
                placeholder="Created Date Range"
              />

              {/* <InputField
                name="origination"
                placeholder="Origin"
                maxLength={128}
              /> */}
              <SelectField
                name="origination"
                placeholder="Select Origination"
                options={
                  locations &&
                  locations.map((i) => ({
                    label: i.site,
                    value: i._id,
                  }))
                }
                // required
                // label="Type"
              />
              {/* <InputField
                name="destination"
                placeholder="Destination"
                maxLength={128}
              /> */}
              <SelectField
                name="destination"
                placeholder="Select Destination"
                options={
                  locations &&
                  locations.map((i) => ({
                    label: i.site,
                    value: i._id,
                  }))
                }
                // required
                // label="Type"
              />
              <SelectField
                name="createdBy"
                placeholder="Created By"
                options={superUsers.map((user) => ({
                  label: user?.name,
                  value: user?._id,
                }))}
                // required
                // label="Type"
              />
              {/* <InputField
                name="materialTransferType"
                placeholder="Transfer Type"
                maxLength={128}
              />
              <InputField
                name="transporter"
                placeholder="Transporter"
                maxLength={128}
              /> */}

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
                      submit(initialValues);
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

export default MaterialTransferFilter;
