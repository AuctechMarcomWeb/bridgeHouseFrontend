import React, { useContext, useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Eye, Edit } from "lucide-react";
import { ProfileContext } from "../context/ProfileContext";
import { getRequest } from "../Helpers";
import EnquiryViewModal from "../components/EnquiryModals/EnquiryViewModal";
import EnquiryEditModal from "../components/EnquiryModals/EnquiryEditModal";

const EnquiryPage = () => {
  const { user } = useContext(ProfileContext);
  const [searchText, setSearchText] = useState(""); 
  const [statusFilter, setStatusFilter] = useState("All");
  const [enquiries, setEnquiries] = useState([]);
  const [modalData, setModalData] = useState("");
  const [viewModalStatus, setViewModalStatus] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);

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
      render: (item) => <>{item?.name}</>,
    },
    {
      title: "Property Code",
      dataIndex: "property",
      key: "property",
      render: (item) => <>{item?.propertyCode}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
            <p className="md:text-xl text-base text-blue-100 mb-8 max-w-3xl mx-auto">
              Manage and track all your property enquiries in a comprehensive table view
            </p>
          </div>
        </div>
      </div>

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
            </Button>
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
