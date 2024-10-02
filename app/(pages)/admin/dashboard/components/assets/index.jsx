import React, { useState } from "react";
import {
  Checkbox,
  Divider,
  Table,
  Button,
  Dropdown,
  Menu,
  Input,
  Space,
  message,
  Modal,
  Steps,
  Select,
  Form,
  Col,
  Row,
} from "antd";
import AssetFilter from "./components/filtersDropdown";

const { Step } = Steps;
const { Option } = Select;

const columns = [
  {
    title: "Asset",
    dataIndex: "name",
    key: "1",
  },
  {
    title: "Cost Center",
    dataIndex: "costCenter",
    key: "2",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "3",
  },
  {
    title: "Serial No.",
    dataIndex: "serialNo",
    key: "4",
  },
  {
    title: "OEM Serial No.",
    dataIndex: "oemSerialNo",
    key: "5",
  },
  {
    title: "Alt ID No.",
    dataIndex: "altIdNo",
    key: "6",
  },
  {
    title: "Criticality",
    dataIndex: "criticality",
    key: "7",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "8",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "9",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "10",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "11",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    costCenter: "New York No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    key: "2",
    name: "Jim Green",
    costCenter: "London No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    key: "3",
    name: "Joe Black",
    costCenter: "Sidney No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    key: "4",
    name: "Jim Red",
    costCenter: "London No. 2 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    key: "5",
    name: "John Brown",
    costCenter: "New York No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    key: "6",
    name: "Jim Green",
    costCenter: "London No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
];
const defaultCheckedList = columns.map((item) => item.key);

const Assets = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [exportVisible, setExportVisible] = useState(false);
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const handleMenuClick = (value) => {
    setCheckedList(value);
  };

  const handleCheckboxChange = (value) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((key) => key !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const menu = (
    <Menu>
      <Menu.ItemGroup title="Select Columns">
        {options.map((option) => (
          <Menu.Item
            key={option.value}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Checkbox
              value={option.value}
              checked={checkedList.includes(option.value)}
              onChange={() => {
                handleCheckboxChange(option.value);
                setVisible(true);
              }}
            >
              {option.label}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  const filterMenu = (
    <Menu>
      <Menu.ItemGroup title="Filter">
        <Menu.Item>
          <Input
            placeholder="Filter by Name"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  const filteredData = data.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const exportMenu = (
    <Menu>
      <Menu.Item>
        <Checkbox
          checked={showHierarchy}
          onChange={(e) => setShowHierarchy(e.target.checked)}
        >
          Show Asset Hierarchy
        </Checkbox>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="primary"
          onClick={() => {
            // Handle export logic here
            message.success(
              "Export initiated with hierarchy: " + showHierarchy
            );
            setExportVisible(false);
          }}
        >
          Export
        </Button>
      </Menu.Item>
    </Menu>
  );

  // Function to open the add asset modal
  const showAddAssetModal = () => {
    setAddAssetVisible(true);
    setCurrentStep(0); // Reset to first step
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleAddAsset = () => {
    // Submit the form data and handle asset addition logic here
    form
      .validateFields()
      .then((values) => {
        console.log("Asset Added: ", values);
        message.success("Asset added successfully!");
        setAddAssetVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.error("Failed to add asset:", errorInfo);
      });
  };

  const steps = [
    {
      title: "Asset Summary",
      content: (
        <Form form={form}>
          <Form.Item
            name="costCenter"
            label="Cost Center"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="parentAsset" label="Parent Asset">
            <Input />
          </Form.Item>
          <Form.Item
            name="accountingDept"
            label="Accounting Dept."
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="dept1">Department 1</Option>
              <Option value="dept2">Department 2</Option>
            </Select>
          </Form.Item>
          <Form.Item name="subunit" label="Subunit">
            <Select>
              <Option value="unit1">Unit 1</Option>
              <Option value="unit2">Unit 2</Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Asset Details",
      content: (
        <Form form={form}>
          <Form.Item
            name="assetClass"
            label="Asset Class"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="altId" label="Alternative ID #">
            <Input maxLength={128} />
          </Form.Item>
          <Form.Item name="physicalLocation" label="Physical Location">
            <Select>
              <Option value="location1">Location 1</Option>
              <Option value="location2">Location 2</Option>
            </Select>
          </Form.Item>
          <Form.Item name="assetNo" label="Asset #">
            <Input maxLength={128} />
          </Form.Item>
          <Form.Item name="rfid" label="RFID/Barcode">
            <Input />
          </Form.Item>
          <Form.Item name="installedDate" label="Installed Date">
            <Input placeholder="MM/DD/YYYY" />
          </Form.Item>
          <Form.Item name="serialNo" label="Serial #">
            <Input />
          </Form.Item>
          <Form.Item name="oemSerialNo" label="OEM Serial #">
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item name="vin" label="VIN">
            <Input />
          </Form.Item>
          <Form.Item name="estimatedLife" label="Estimated Life (months)">
            <Input />
          </Form.Item>
          <Form.Item name="downtimeCost" label="Downtime Cost Per Hour">
            <Input />
          </Form.Item>
          <Form.Item name="unit" label="Unit">
            <Select>
              <Option value="unit1">Unit 1</Option>
              <Option value="unit2">Unit 2</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea maxLength={150} />
          </Form.Item>
          <Form.Item name="specDetails" label="Spec Details">
            <Input.TextArea maxLength={500} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Asset Maintenance Info",
      content: (
        <Form form={form}>
          <Form.Item name="criticality" label="Criticality">
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item name="originalMfrDate" label="Original Mfr. Date">
            <Input placeholder="MM/DD/YYYY" />
          </Form.Item>
          <Form.Item name="condition" label="Condition">
            <Select>
              <Option value="new">New</Option>
              <Option value="used">Used</Option>
              <Option value="refurbished">Refurbished</Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Maintenance Status Info   ",
      content: (
        <Form form={form}>
          <Form.Item name="maintStatus" label="Maint. Status">
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item name="maintStartDate" label="Maint. Start Date">
            <Input placeholder="MM/DD/YYYY" />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="bg-primary rounded-xl p-5 pt-8 mb-10">
      {/* <Divider> */}
      <div className="flex gap-3">
        {" "}
        <Input
          placeholder="Search..."
          style={{ marginBottom: 16 }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Dropdown
          overlay={<AssetFilter />}
          trigger={["click"]}
          open={filterVisible}
          onOpenChange={setFilterVisible}
        >
          <Button onClick={() => setFilterVisible(!filterVisible)}>
            Filter
          </Button>
        </Dropdown>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          open={visible}
          onOpenChange={setVisible}
        >
          <Button onClick={() => setVisible(!visible)}>Column Settings</Button>
        </Dropdown>
        <Dropdown
          overlay={exportMenu}
          trigger={["click"]}
          open={exportVisible}
          onOpenChange={setExportVisible}
        >
          <Button onClick={() => setExportVisible(!exportVisible)}>
            Export
          </Button>
        </Dropdown>
        <Button type="primary" onClick={showAddAssetModal}>
          Add New Asset
        </Button>
      </div>
      <div className="flex gap-3 justify-end">
        <p className="text-secondary">
          Total Assets:{" "}
          <span className="text-white">{"(" + filteredData.length + ")"}</span>
        </p>
        <p className="text-secondary">
          Parent Assets:{" "}
          <span className="text-white">{"(" + filteredData.length + ")"}</span>
        </p>
      </div>
      {/* </Divider> */}
      <Table
        columns={newColumns}
        dataSource={filteredData}
        style={{
          marginTop: 24,
          overflow: "auto",
        }}
      />

      <Modal
        title="Add New Asset"
        open={addAssetVisible}
        onCancel={() => setAddAssetVisible(false)}
        footer={null}
        width={1000} // Adjusted width
        style={{ top: 20 }}
        bodyStyle={{ height: "600px", overflowY: "auto", overflowX: "hidden" }} // Adjusted height
      >
        <Steps current={currentStep}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>

        <div style={{ marginTop: 16 }}>
          {currentStep === 0 && (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                  <Input placeholder="Cost Center" maxLength={128} />
                </Col>
                <Col span={8}>
                  <Input placeholder="Parent Asset" maxLength={128} />
                </Col>
                <Col span={8}>
                  <Select
                    placeholder="Accounting Dept."
                    style={{ width: "100%" }}
                  >
                    {/* Options */}
                  </Select>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={8}>
                  <Select placeholder="Subunit" style={{ width: "100%" }} />
                </Col>
                <Col span={8}>
                  <Input placeholder="Asset Class" maxLength={128} />
                </Col>
                <Col span={8}>
                  <Input placeholder="Alternative ID #" maxLength={128} />
                </Col>
              </Row>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                  <Input placeholder="Physical Location" maxLength={128} />
                </Col>
                <Col span={8}>
                  <Input placeholder="Asset #" maxLength={128} />
                </Col>
                <Col span={8}>
                  <Input placeholder="RFID/Barcode" maxLength={128} />
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={8}>
                  <Input placeholder="Installed Date" maxLength={128} />
                </Col>
                <Col span={8}>
                  <Input placeholder="Serial #" maxLength={128} />
                </Col>
                <Col span={8}>
                  <Input placeholder="OEM Serial #" maxLength={50} />
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={8}>
                  <Input
                    placeholder="Estimated Life (months)"
                    maxLength={128}
                  />
                </Col>
                <Col span={8}>
                  <Input placeholder="Downtime Cost Per Hour" maxLength={128} />
                </Col>
                <Col span={8}>
                  <Select placeholder="Unit" style={{ width: "100%" }} />
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={24}>
                  <Input placeholder="Description" maxLength={150} />
                  <div style={{ textAlign: "right" }}>0/150</div>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={24}>
                  <Input placeholder="Spec Details" maxLength={500} />
                  <div style={{ textAlign: "right" }}>0/500</div>
                </Col>
              </Row>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                  <Select placeholder="Criticality" style={{ width: "100%" }} />
                </Col>
                <Col span={8}>
                  <Input
                    placeholder="Original Mfr. Date (MM/DD/YYYY)"
                    maxLength={10}
                  />
                </Col>
                <Col span={8}>
                  <Select placeholder="Condition" style={{ width: "100%" }} />
                </Col>
              </Row>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <Row gutter={16}>
                <Col span={8}>
                  <Select
                    placeholder="Maint. Status"
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col span={8}>
                  <Input
                    placeholder="Maint. Start Date (MM/DD/YYYY)"
                    maxLength={10}
                  />
                </Col>
              </Row>
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            {currentStep > 0 && (
              <Button style={{ marginRight: 8 }} onClick={handlePrev}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={handleAddAsset}>
                Add Asset
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Assets;
