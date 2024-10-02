import React, { useState } from "react";
import { Row, Col, Input, Select, Button, Menu } from "antd";

const { Option } = Select;

const AssetFilter = ({ onFilter, onClear }) => {
  const [filters, setFilters] = useState({
    assetNumber: "",
    assetDescription: "",
    altId: "",
    serialNumber: "",
    barcode: "",
    oemSerialNumber: "",
    physicalLocation: "",
    accountingDept: "",
    status: "",
    category: "",
    system: "",
    tier3: "",
    tier4: "",
    tier5: "",
    tier6: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    onFilter(filters); // Pass filters to parent component
  };

  const handleClear = () => {
    setFilters({
      assetNumber: "",
      assetDescription: "",
      altId: "",
      serialNumber: "",
      barcode: "",
      oemSerialNumber: "",
      physicalLocation: "",
      accountingDept: "",
      status: "",
      category: "",
      system: "",
      tier3: "",
      tier4: "",
      tier5: "",
      tier6: "",
    });
    onClear(); // Notify parent to clear the filters
  };

  return (
    <Menu style={{padding: "16px"}}>
      <Row gutter={16}>
        <Col span={8}>
          <Input
            name="assetNumber"
            placeholder="Asset #"
            // value={filters.assetNumber}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={8}>
          <Input
            name="assetDescription"
            placeholder="Asset Description"
            // value={filters.assetDescription}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={8}>
          <Input
            name="altId"
            placeholder="Alt ID #"
            // value={filters.altId}
            onChange={handleInputChange}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Input
            name="serialNumber"
            placeholder="Serial #"
            // value={filters.serialNumber}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={8}>
          <Input
            name="barcode"
            placeholder="Barcode"
            // value={filters.barcode}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={8}>
          <Input
            name="oemSerialNumber"
            placeholder="OEM Serial #"
            // value={filters.oemSerialNumber}
            onChange={handleInputChange}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Select
            placeholder="Physical Location"
            // value={filters.physicalLocation}
            onChange={(value) => handleSelectChange("physicalLocation", value)}
            style={{ width: "100%" }}
          >
            {/* Add your options here */}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="Accounting Dept."
            // value={filters.accountingDept}
            onChange={(value) => handleSelectChange("accountingDept", value)}
            style={{ width: "100%" }}
          >
            {/* Add your options here */}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="Status"
            // value={filters.status}
            onChange={(value) => handleSelectChange("status", value)}
            style={{ width: "100%" }}
          >
            {/* Add your options here */}
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Select
            placeholder="Category"
            // value={filters.category}
            onChange={(value) => handleSelectChange("category", value)}
            style={{ width: "100%" }}
          >
            {/* Add your options here */}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="System"
            // value={filters.system}
            onChange={(value) => handleSelectChange("system", value)}
            style={{ width: "100%" }}
          >
            {/* Add your options here */}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="Tier 3"
            // value={filters.tier3}
            onChange={(value) => handleSelectChange("tier3", value)}
            style={{ width: "100%" }}
          >
            {/* Add your options here */}
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Select
            placeholder="Tier 4"
            // value={filters.tier4}
            onChange={(value) => handleSelectChange("tier4", value)}
            style={{ width: "100%" }}
          >
            {/* Add your options here */}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="Tier 5"
            // value={filters.tier5}
            onChange={(value) => handleSelectChange("tier5", value)}
            style={{ width: "100%" }}
          >
            {/* Add your options here */}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="Tier 6"
            // value={filters.tier6}
            onChange={(value) => handleSelectChange("tier6", value)}
            style={{ width: "100%" }}
          >
            {/* Add your options here */}
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Button onClick={handleClear} style={{ width: "100%" }}>
            Clear Filter
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={handleFilter}
            style={{ width: "100%" }}
          >
            Filter
          </Button>
        </Col>
      </Row>
    </Menu>
  );
};

export default AssetFilter;
