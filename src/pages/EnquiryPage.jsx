import React, { useContext, useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  Home,
  Users,
  Award,
  TrendingUp,
  Heart,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";
import { Eye, Edit } from "lucide-react";
import { ProfileContext } from "../context/ProfileContext";
import { getRequest } from "../Helpers";
import EnquiryViewModal from "../components/EnquiryModals/EnquiryViewModal";
import EnquiryEditModal from "../components/EnquiryModals/EnquiryEditModal";
import { Eye, Edit } from "lucide-react";
import ExportButton from "./ExportButton";

const EnquiryPage = () => {
  const { user } = useContext(ProfileContext);
  const [searchText, setSearchText] = useState("");

const EnquiryPage = () => {
  const { user } = useContext(ProfileContext);
  const [searchText, setSearchText] = useState(""); 
  const [statusFilter, setStatusFilter] = useState("All");
  const [enquiries, setEnquiries] = useState([]);
  const [modalData, setModalData] = useState("");
  const [viewModalStatus, setViewModalStatus] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);

  const handleCancel = () => {
    setViewModalStatus(false);
  };
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
   {
  title: "Message",
  dataIndex: "message",   
  key: "message",
  render: (text) => <span className="line-clamp-2">{text}</span>,
},

    {
      title: "Property Name",
      dataIndex: "property",
      key: "property",
      responsive: ["lg"],
      render: (item) => {
        return <>{item?.name}</>;
      },
      render: (item) => <>{item?.name}</>,
    },
    {
      title: "Property Code",
      dataIndex: "property",
      key: "property",
      responsive: ["lg"],
      render: (item) => {
        return <>{item?.propertyCode}</>;
      },
      render: (item) => <>{item?.propertyCode}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["lg"],
      render: (_, item) => {
        console.log("item", item);

        return <>{item?.status}</>;
      },
    },

    {
      title: "Action",
      dataIndex: "property",
      key: "property",
      responsive: ["lg"],
      render: (_, item) => {
        return (
          <>
            <div className="flex gap-3">
              {/* View Button with Icon */}
              <button
                onClick={() => {
                  setModalData(item);
                  setViewModalStatus(true);
                }}
                className="p-2 rounded-full hover:bg-blue-100 transition"
              >
                <Eye className="text-blue-600 w-5 h-5" />
              </button>

              {/* Edit Button with Icon */}
              <button
                onClick={() => {
                  setModalData(item);
                  setEditModalStatus(true);
                }}
                className="p-2 rounded-full hover:bg-green-100 transition"
              >
                <Edit className="text-green-600 w-5 h-5" />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getRequest(`enquiry?addedBy=${user?._id}`)
      .then((res) => {
        setEnquiries(res?.data?.data?.enquiries);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [user]);

  return (
    <>
      {/* Top Info Section */}
      render: (_, item) => <>{item?.status}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setModalData(item);
              setViewModalStatus(true);
            }}
            className="p-2 rounded-full hover:bg-blue-100 transition"
          >
            <Eye className="text-blue-600 w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setModalData(item);
              setEditModalStatus(true);
            }}
            className="p-2 rounded-full hover:bg-green-100 transition"
          >
            <Edit className="text-green-600 w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  //  Fetch enquiries
  const fetchEnquiries = () => {
    getRequest(`enquiry?addedBy=${user?._id}`)
      .then((res) => {
        setEnquiries(res?.data?.data?.enquiries || []);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (user?._id) fetchEnquiries();
  }, [user]);


  //  Sirf status filter apply hoga
  const filteredEnquiries = enquiries.filter((enquiry) => {
    if (statusFilter === "All") return true;
    return enquiry?.status === statusFilter;
  });


  return (
    <>
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-blue-900 w-full shadow-lg mb-6">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Property Enquiries
            </h1>

            {/* Subtitle */}
            <p className="md:text-xl text-base text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Manage and track all your property enquiries in a comprehensive
              table view
            <p className="md:text-xl text-base text-blue-100 mb-8 max-w-3xl mx-auto">
              Manage and track all your property enquiries in a comprehensive table view
            </p>
          </div>
        </div>
      </div>

      {/* Filter / Search Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 mb-6 border border-gray-100">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Filter Enquiries
          </h2>

          {/* Form Controls */}
      {/* Filters */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-[#004d88] mb-4">Filter Enquiries</h2>
          <div className="flex flex-wrap items-center gap-4">
            {/*  Search input sirf UI ke liye, logic nahi */}
            <Input
              placeholder="Search by name, email, phone"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 min-w-[200px] md:min-w-[250px] rounded-xl border border-gray-300"
            />
            {/* Status Dropdown */}
            <select
              className="min-w-[150px] rounded-xl border border-gray-300 p-2 
                         focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
            >
              <option>All Status</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Interested</option>
              <option>Closed</option>
            </select>
            {/* Export Button */}
            {/* <Button
              type="primary"
              className="bg-gradient-to-r from-cyan-400 to-teal-500 
                   hover:scale-105 transition-transform duration-300"
              onClick={handleExport}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="min-w-[150px] rounded-xl border border-gray-300 p-2"
            >
              <option>All</option>
              <option>new</option>
              <option>contacted</option>
              <option>closed</option>
            </select>
            <Button type="primary" className="!bg-[#004d88] text-white rounded-lg shadow-md">
              Export
            </Button> */}{" "}
            <ExportButton
              enquiries={enquiries}
              fileName="Enquiry.xlsx"
              sheetName="Enquiry"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 mb-6 border border-gray-100">
          <Table
            bordered
            dataSource={filteredEnquiries}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
            className="rounded-xl font-bold"
          />
        </div>
      </div>

      {/* Modals */}
      {viewModalStatus && (
        <EnquiryViewModal
          openModal={viewModalStatus}
          modalData={modalData}
          setModal={setViewModalStatus}
        />
      )}
      {editModalStatus && (
        <EnquiryEditModal
          openModal={editModalStatus}
          modalData={modalData}
          setModal={setEditModalStatus}
          setModal={(status) => {
            setEditModalStatus(status);
            if (!status) fetchEnquiries();
          }}
        />
      )}
    </>
  );
};

export default EnquiryPage;
