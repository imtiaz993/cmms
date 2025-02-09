import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Formik } from "formik";
import { useState } from "react";

const CompanyDetails = () => {
  const [rigManagers, setRigManagers] = useState(1);
  return (
    <div className="h-[calc(100dvh-140px-16px-60px-10px)] overflow-auto p-[12px_12px_28px_0px]">
      <Formik initialValues={{}}>
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <div className="grid grid-cols-1 gap-4 md:gap-8">
                <p className="font-semibold md:text-lg">Company Information</p>
                <InputField
                  name="companyName"
                  placeholder="Company Name"
                  label="Company Name"
                />
                <SelectField
                  name="country"
                  placeholder="Select Country"
                  label="Country"
                />
                <InputField
                  name="address"
                  placeholder="Street Name"
                  label="Address"
                />
                <InputField
                  name="apartment"
                  placeholder="Apt./Suite #"
                  label="Apt./Suite #"
                />
                <InputField name="city" placeholder="City" label="City" />
                <SelectField
                  name="state"
                  placeholder="Select State"
                  label="State"
                />
                <InputField
                  name="zip"
                  placeholder="xxxxx-xxxx"
                  label="Zip Code"
                />
                <p className="font-semibold md:text-lg">Contact Information</p>
                <InputField
                  name="phone"
                  placeholder="(000) 000-0000"
                  label="Phone Number"
                />
                <InputField
                  name="email"
                  placeholder="Email@email.com"
                  label="Email Address"
                />
                {[...Array(rigManagers)].map((_, i) => (
                  <InputField
                    name={"rigManager" + i}
                    placeholder="First Name Last Name"
                    label="Rig Manager"
                  />
                ))}
                <div className="sm:ml-32 flex flex-wrap gap-5">
                  <Button
                    className="!bg-[#4C4C51] !shadow-custom !border-white w-full sm:w-52"
                    onClick={() => setRigManagers(rigManagers + 1)}
                    fullWidth={false}
                    prefix={<PlusOutlined />}
                    text="Add More Rig Managers"
                  />
                  {rigManagers > 1 && (
                    <Button
                      className="w-full sm:w-52"
                      outlined
                      onClick={() => setRigManagers(rigManagers - 1)}
                      fullWidth={false}
                      text="Remove Rig Manager"
                      prefix={<DeleteOutlined />}
                    />
                  )}
                </div>

                <p className="font-semibold md:text-lg">
                  Timezone & Currency Information
                </p>
                <SelectField
                  name="timezone"
                  placeholder="Select Timezone"
                  label="Timezone"
                />
                <SelectField
                  name="currency"
                  placeholder="Select Currency"
                  label="Currency"
                />
                <SelectField
                  name="dateFormat"
                  placeholder="Select Format"
                  label="Date Format"
                  options={[
                    { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
                    { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
                    { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
                  ]}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <SelectField
                    name="financialYearMonth"
                    placeholder="Select Month"
                    label="Financial Year Start"
                  />
                  <SelectField
                    name="financialYearDay"
                    placeholder="Select Day"
                    // label="Financial Year Start"
                  />
                </div>
                <p className="font-semibold md:text-lg">
                  Delete Company & Close Account
                </p>
                <div>
                  <Button
                    text="Delete Company, User Accounts & All Data"
                    className="!bg-red-500 w-full sm:w-auto"
                    fullWidth={false}
                    prefix={<CloseOutlined />}
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

export default CompanyDetails;
