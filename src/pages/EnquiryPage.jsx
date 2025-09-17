import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const EnquiryPage = () => {
  const staticData = [
    {
      _id: "1",
      name: "Amit Sharma",
      email: "amit@example.com",
      phone: "9876543210",
      message: "Interested in 2BHK apartment.",
      propertyId: "PROP001",
    },
    {
      _id: "2",
      name: "Neha Verma",
      email: "neha@example.com",
      phone: "9876500000",
      message: "Need details about commercial space.",
      propertyId: "PROP002",
    },
    {
      _id: "3",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
    {
      _id: "4",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
    {
      _id: "5",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
    {
      _id: "6",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
    {
      _id: "7",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
    {
      _id: "8",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
    {
      _id: "9",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
    {
      _id: "10",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
    {
      _id: "11",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
    {
      _id: "12",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9123456789",
      message: "Want to schedule a site visit.",
      propertyId: "PROP003",
    },
  ];

  const [searchText, setSearchText] = useState("");

  const filteredData = staticData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.phone.includes(searchText)
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["md", "lg"],
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      responsive: ["md", "lg"],
      render: (text) => <span className="line-clamp-2">{text}</span>,
    },
    {
      title: "Property ID",
      dataIndex: "propertyId",
      key: "propertyId",
      responsive: ["lg"],
    },
  ];

  return (
    <div
      className="bg-white shadow-md rounded-lg p-2 border border-gray-300
p-4 md:p-8 bg-gray-50 min-h-screen"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Enquiry List</h1>
        <Space>
          <Input
            placeholder="Search by name, email, phone"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-64"
          />
          <Button type="primary" onClick={() => setSearchText("")}>
            Clear
          </Button>
        </Space>
      </div>

      {/* 🔹 Add `bordered` prop + Tailwind border classes */}
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <Table
          bordered // ✅ Ant Design borders
          dataSource={filteredData}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default EnquiryPage;
