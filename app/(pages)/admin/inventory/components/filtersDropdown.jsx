import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Select, message } from "antd";
import { login } from "app/services/auth";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import { getFilteredInventory } from "app/services/inventory";
import DatePickerField from "@/components/common/DatePickerField";
import { useDispatch } from "react-redux";
import {
  setInventory,
  setInventoryError,
  setInventoryLoading,
} from "app/redux/slices/inventoriesSlice";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  inventoryNumber: Yup.string(),
});

const InventoryFilter = ({ closeDropdown }) => {
  const dispatch = useDispatch();
  const [isClearing, setIsClearing] = useState(false);

  const submit = async (values, setSubmitting) => {
    console.log(values);
    dispatch(setInventoryLoading(true));
    !setSubmitting && setIsClearing(true);
    const { status, data } = await getFilteredInventory(values);
    setSubmitting ? setSubmitting(false) : setIsClearing(false);
    if (status === 200) {
      message.success(data?.message || "Inventory fetched successfully");
      dispatch(setInventory(data?.data));
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
      <Formik
        initialValues={{
          partName: "",
          partItem: "",
          category: "",
          details: "",
          quantity: "",
          price: "",
          location: "",
          PO: "",
          SO: "",
          invoiceNumber: "",
          supplier: "",
          receivedDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, handleSubmit, resetForm, setSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField
                name="partName"
                placeholder="Part Name"
                maxLength={128}
              />
              <InputField
                name="partItem"
                placeholder="Part # / Item #"
                maxLength={128}
              />
              <SelectField
                name="category"
                placeholder="Type / Category"
                options={[{ value: "Cat 1", label: "Cat 1" }]}
              />

              <InputField
                name="quantity"
                placeholder="Quantity"
                maxLength={50}
              />
              <InputField name="price" placeholder="Price" maxLength={128} />
              <InputField
                name="location"
                placeholder="Location"
                maxLength={128}
              />

              <InputField name="PO" placeholder="PO" maxLength={128} />
              <InputField name="SO" placeholder="SO" maxLength={128} />
              <InputField
                name="invoiceNumber"
                placeholder="Inv. #"
                maxLength={128}
              />
              <SelectField
                name="supplier"
                placeholder="Vendor"
                options={[
                  { value: "supplier1", label: "Supplier 1" },
                  { value: "supplier2", label: "Supplier 2" },
                  { value: "supplier3", label: "Supplier 3" },
                  { value: "supplier4", label: "Supplier 4" },
                  { value: "supplier5", label: "Supplier 5" },
                ]}
              />
              <DatePickerField
                name="receivedDate"
                placeholder="Received Date"
              />
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

export default InventoryFilter;
