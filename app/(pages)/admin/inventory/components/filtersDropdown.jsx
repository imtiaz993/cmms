import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Select, Spin, message } from "antd";
import { login } from "app/services/auth";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import { getFilteredInventory } from "app/services/inventory";
import DatePickerField from "@/components/common/DatePickerField";
import { useDispatch, useSelector } from "react-redux";
import {
  setInventory,
  setInventoryError,
  setInventoryLoading,
} from "app/redux/slices/inventoriesSlice";
import { useEffect, useState } from "react";
import { getVendors } from "app/services/common";

const validationSchema = Yup.object().shape({
  inventoryNumber: Yup.string(),
});

const InventoryFilter = ({ closeDropdown, setFilteredInventory }) => {
  const dispatch = useDispatch();
  const [isClearing, setIsClearing] = useState(false);
  const locations = useSelector((state) => state.location.location);
  const [vendors, setVendors] = useState();

  useEffect(() => {
    const handleFetchVendors = async () => {
      const { status, data } = await getVendors();
      if (status === 200) {
        setVendors(data.vendors);
      } else {
        message.error(data.error);
      }
    };

    handleFetchVendors();
  }, []);

  const submit = async (values, setSubmitting) => {
    console.log(values);
    dispatch(setInventoryLoading(true));
    !setSubmitting && setIsClearing(true);
    const { status, data } = await getFilteredInventory(values);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Inventory fetched successfully");
      // dispatch(setInventory(data?.data));
      setFilteredInventory(data?.data);
      closeDropdown();
    } else {
      dispatch(setInventoryError(data?.error));
      message.error(data?.message || "Failed to fetch inventory");
    }
    dispatch(setInventoryLoading(false));
  };

  return (
    <div
      className="p-4 bg-primary rounded-md max-h-[400px] overflow-auto"
      style={{
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      {vendors ? (
        <Formik
          initialValues={{
            site: "",
            vendor: "",
            partNumber: "",
            description: "",
            receivedDate: null,
            quantity: "",
            tagId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            submit(values, setSubmitting);
          }}
        >
          {({
            values,
            isSubmitting,
            handleSubmit,
            resetForm,
            setSubmitting,
          }) => (
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
                  name="vendor"
                  placeholder="Vendor"
                  options={vendors?.map((i) => ({
                    label: i.name,
                    value: i._id,
                  }))}
                />
                <InputField name="partNumber" placeholder="Part #" />
                <InputField name="description" placeholder="Description" />
                <DatePickerField
                  name="receivedDate"
                  placeholder="Received Date"
                />

                <InputField name="quantity" placeholder="Quantity" />
                <InputField name="tagId" placeholder="Tag ID" />

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
      ) : (
        <div className="flex items-center justify-center h-full">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default InventoryFilter;
