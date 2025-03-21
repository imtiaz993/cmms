import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import { getFilteredAssets } from "app/services/assets";
import { rigs, systems } from "@/constants/rigsAndSystems";
import DatePickerField from "@/components/common/DatePickerField";
import { useDispatch, useSelector } from "react-redux";
import { setAssets, setAssetsLoading } from "app/redux/slices/assetsSlice";

const validationSchema = Yup.object().shape({
  assetNumber: Yup.string(),
});

const AssetFilter = ({ closeDropdown, setFilteredAssets, options }) => {
  const [isClearing, setIsClearing] = useState(false);
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);

  const submit = async (values, setSubmitting) => {
    console.log(values);
    !setSubmitting && setIsClearing(true);
    dispatch(setAssetsLoading(true));
    const { status, data } = await getFilteredAssets(values);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Assets fetched successfully");
      // dispatch(setAssets(data?.data));
      setFilteredAssets(data?.data);
      closeDropdown();
    } else {
      message.error(data?.message || "Failed to fetch assets");
    }
    dispatch(setAssetsLoading(false));
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
          system: "",
          assetID: "",
          serialNumber: "",
          model: "",
          criticality: "",
          maintStatus: "",
          purchaseDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        {({ values, isSubmitting, handleSubmit, resetForm, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                options={
                  values.site &&
                  systems
                    .filter((i) => i?.site?._id === values.site)
                    ?.map((i) => ({
                      label: i.system,
                      value: i._id,
                    }))
                }
              />
              {/* <InputField name="assetID" placeholder="Asset #" />
              <InputField name="serialNumber" placeholder="Serial #" />
              <InputField name="model" placeholder="Model" /> */}
              <SelectField
                name="criticality"
                placeholder="Priority"
                options={[
                  { value: "Critical", label: "Critical" },
                  { value: "High", label: "High" },
                  { value: "Medium", label: "Medium" },
                  { value: "Low", label: "Low" },
                ]}
              />
              <SelectField
                name="maintStatus"
                placeholder="Status"
                options={options}
              />
              {/* <DatePickerField
                name="purchaseDate"
                placeholder="Purchase Date"
              /> */}
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

export default AssetFilter;
